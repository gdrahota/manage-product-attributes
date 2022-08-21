import { IProduct, Product } from "../product"
import { EnumSearchStrategy } from "../../db/enums/search-strategy"
import { ProductGroup } from "../product-group"
import { EnumProductValueType } from "../../db/enums/product-value-type"
import { pg } from "../../db/connect"
import { ProductAttributeValueTable, tProductAttributeValueTable } from "../../db/tables/product-attribute-values"
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

type tResponse = {
  numberOfProducts: number
  products: IProduct[]
  attributes: IResponseAttributesWithValues[]
}

export class ProductSearch {
  private product = new Product()
  private productGroup = new ProductGroup()
  private productAttributeValueTable = new ProductAttributeValueTable()
  private productAttributeTable = new ProductAttributeTable<IProductAttributeTable>()

  async searchProductsAndAttributeValues( productGroupId: number, params: ISearchProductsProp ): Promise<tResponse> {
    return {
      ...await this.searchProducts( productGroupId, params ),
      attributes: await this.searchAttrValues( productGroupId, params.filters )
    }
  }

  private async searchProducts( productGroupId: number, {
    filters,
    page,
    itemsPerPage
  }: ISearchProductsProp ): Promise<Omit<tResponse, 'attributes'>> {
    const query = pg( 'product_to_product_groups as p2pg' )//.queryBuilder()
      .from( 'product_to_product_groups as p2pg' )
      .innerJoin( 'products as p', 'p2pg.product_id', 'p.id' )
      .where( 'p2pg.product_group_id', productGroupId )

    await Bluebird.each( filters, async ( filter ) => {
      return this.addSearchAttr( query, filter )
    } )

    const [ { count: numberOfProducts } ] = await query.clone().select( pg.raw( 'count(*) AS count' ) )

    const results = await query
      .select( 'p.id' )
      .orderBy( 'p.name' )
      .limit( itemsPerPage )
      .offset( itemsPerPage * (page - 1) )

    const products = await Bluebird.mapSeries( results, async ( { id } ) => {
      return this.product.getById( id )
    } )

    return {
      numberOfProducts: parseInt( numberOfProducts ),
      products,
    }
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

      const results = (await query).map( snakeToCamelRecord ) as tProductAttributeValueTable[]

      const attrDef = await this.productAttributeTable.getById( attribute.attrId ) as IProductAttributeTable

      response[attribute.attrId] = results.map( ( r: tProductAttributeValueTable ) => {
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

      case EnumSearchStrategy.LT:
      case EnumSearchStrategy.LTE:
      case EnumSearchStrategy.GT:
      case EnumSearchStrategy.GTE: {
        query.innerJoin( `product_to_attr_values as p2at${ idx }`, `p2pg.product_id`, `p2at${ idx }.product_id` )

        if ( filter.valueId ) {
          const tillObj = await this.productAttributeValueTable.getById( filter.valueId )

          if ( tillObj ) {
            const valueTill = tillObj.decimalValue
              ? parseFloat( tillObj.decimalValue )
              : null

            if ( valueTill !== null ) {
              let operator
              switch ( filter.searchStrategy ) {
                case EnumSearchStrategy.LT:
                  operator = '<'
                  break
                case EnumSearchStrategy.LTE:
                  operator = '<='
                  break
                case EnumSearchStrategy.GT:
                  operator = '>'
                  break
                case EnumSearchStrategy.GTE:
                  operator = '>='
                  break
              }

              const records = await pg.queryBuilder()
                .select( 'id' )
                .from( 'attr_values' )
                .where( 'attr_id', filter.attrId )
                .where( 'decimal_value', operator, valueTill )

              const valuesIds = records.map( ( { id } ) => id )

              query.whereIn( `p2at${ idx }.product_attribute_value_id`, valuesIds )
            }
          }
        }
      }
        break
    }
  }
}
