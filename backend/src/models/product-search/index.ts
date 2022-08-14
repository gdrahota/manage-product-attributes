import { IProduct, Product } from "../product"
import { EnumSearchStrategy } from "../../db/enums/search-strategy"
import { ProductGroup } from "../product-group"
import { EnumProductValueType } from "../../db/enums/product-value-type"
import { pg } from "../../db/connect"
import { IProductAttributeValueTable, ProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import Bluebird from "bluebird"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import { snakeToCamelRecord } from "../../db/helper"

export interface IProductSearchFilter {
  attrId: number
  productValueType: EnumProductValueType
  searchStrategy: EnumSearchStrategy
  valueId?: number | null
  valueIds?: number[]
  valueIdFrom?: number | null
  valueIdTill?: number | null
}

interface ISearchProductsProp {
  filters: IProductSearchFilter[]
  page: number
  itemsPerPage: number
}


interface IResponseValue {
  id: number
  value: number | string | boolean
}

interface IResponseAttributesWithValues {
  attrId: any,
  unit: string | null
  searchStrategy: string | null
  values: IResponseValue[]
}

interface IResponse {
  products: IProduct[]
  attributes: IResponseAttributesWithValues[]
}

export class ProductSearch {
  private product = new Product()
  private productGroup = new ProductGroup()
  private productAttributeValueTable = new ProductAttributeValueTable<IProductAttributeValueTable>()
  private productAttributeTable = new ProductAttributeTable<IProductAttributeTable>()

  async searchProductsAndAttributeValues( productGroupId: number, params: ISearchProductsProp ): Promise<IResponse> {
    return {
      products: await this.searchProducts( productGroupId, params ),
      attributes: await this.searchAttrValues( productGroupId, params.filters )
    }
  }

  private async searchProducts( productGroupId: number, { filters, page, itemsPerPage }: ISearchProductsProp ): Promise<any> {
    const query = pg.queryBuilder()
      .select( 'p.id' )
      .from( 'product_to_product_groups as p2pg' )
      .innerJoin( 'products as p', 'p2pg.product_id', 'p.id' )
      .where( 'p2pg.product_group_id', productGroupId )
      .orderBy( 'p.name' )
      .limit( itemsPerPage )
      .offset( itemsPerPage * (page - 1) )

    await Bluebird.each( filters, async ( filter ) => {
      return this.addSearchAttr( query, filter )
    } )

    const results = await query

    return Bluebird.mapSeries( results, async ( { id } ) => {
      return this.product.getById( id )
    } )
  }

  private async searchAttrValues( productGroupId: number, filters: IProductSearchFilter[] ): Promise<any> {
    const productGroup = await this.productGroup.getById( productGroupId )

    const response: any = {}

    await Bluebird.each( productGroup.attributes, async attribute => {
      const query = pg.queryBuilder()
        .distinct( 'av.*' )
        .from( 'product_to_product_groups as p2pg' )
        .where( 'p2pg.product_group_id', productGroupId )
        .innerJoin( 'products as p', 'p2pg.product_id', 'p.id' )
        .innerJoin( `product_to_attr_values as p2at${ attribute.attrId }`, `p2pg.product_id`, `p2at${ attribute.attrId }.product_id` )
        .innerJoin( 'attr_values as av', `p2at${ attribute.attrId }.product_attribute_value_id`, 'av.id' )
        .where( `av.attr_id`, attribute.attrId )

      await Bluebird.each( filters, async ( filter ) => {
        if ( filter.attrId !== attribute.attrId ) {
          await this.addSearchAttr( query, filter )
        }
      } )

      const results = (await query).map( snakeToCamelRecord ) as IProductAttributeValueTable[]

      const attrDef = await this.productAttributeTable.getById( attribute.attrId ) as IProductAttributeTable

      response[attribute.attrId] = results.map( ( r: IProductAttributeValueTable ) => {
        const commonAttrs: any = {
          id: r.id,
          attrId: r.attrId
        }

        switch ( attrDef.type ) {
          case 'decimal':
            if ( r.decimalValue ) {
              return {
                ...commonAttrs,
                value: parseFloat( r.decimalValue )
              }
            }
            break
          case 'text':
            if ( r.textValue ) {
              return {
                ...commonAttrs,
                value: r.textValue
              }
            }
            break
          case 'boolean':
            return {
              ...commonAttrs,
              value: r.boolValue
            }
        }
      } ).filter( i => !! i )
    } )

    return response
  }

  private async addSearchAttr( query: any, filter: IProductSearchFilter ): Promise<any> {
    const idx = filter.attrId

    switch ( filter.searchStrategy ) {
      case EnumSearchStrategy.BETWEEN: {
        let fromValue: any
        let tillValue: any

        if ( filter.valueIdFrom ) {
          const fromObj = await this.productAttributeValueTable.getById( filter.valueIdFrom )
          if ( fromObj ) {
            fromValue = fromObj.decimalValue
              ? parseFloat( fromObj.decimalValue )
              : null
          }
        }

        if ( filter.valueIdTill ) {
          const tillObj = await this.productAttributeValueTable.getById( filter.valueIdTill )
          if ( tillObj ) {
            tillValue = tillObj.decimalValue
              ? parseFloat( tillObj.decimalValue )
              : null
          }
        }

        let records: any[] = []

        if ( ! isNaN( fromValue ) && ! isNaN( tillValue ) ) {
          records = await pg.queryBuilder()
            .select( 'id' )
            .from( 'attr_values' )
            .where( 'attr_id', filter.attrId )
            .where( 'decimal_value', '>=', fromValue )
            .where( 'decimal_value', '<=', tillValue )

        } else if ( ! isNaN( fromValue ) ) {
          records = await pg.queryBuilder()
            .select( 'id' )
            .from( 'attr_values' )
            .where( 'attr_id', filter.attrId )
            .where( 'decimal_value', '>=', fromValue )

        } else if ( ! isNaN( tillValue ) ) {
          records = await pg.queryBuilder()
            .select( 'id' )
            .from( 'attr_values' )
            .where( 'attr_id', filter.attrId )
            .where( 'decimal_value', '<=', tillValue )

        }

        const valuesIds = records.map( ( { id } ) => id )

        query
          .innerJoin( `product_to_attr_values as p2at${ idx }`, `p2pg.product_id`, `p2at${ idx }.product_id` )
          .whereIn( `p2at${ idx }.product_attribute_value_id`, valuesIds )
      }
        break

      case EnumSearchStrategy.EQUAL: {
        query.innerJoin( `product_to_attr_values as p2at${ idx }`, `p2pg.product_id`, `p2at${ idx }.product_id` )

        if ( filter.valueId ) {
          query.where( `p2at${ idx }.product_attribute_value_id`, filter.valueId )
        }
      }
        break
    }
  }

  private async searchEqual( productGroupId: number, filter: IProductSearchFilter ): Promise<any> {
  }

  private async searchBetween( productGroupId: number, filter: IProductSearchFilter ): Promise<any> {
  }
}