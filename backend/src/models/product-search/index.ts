import { IProduct, ProductService } from '../product'
import { EnumSearchStrategy } from '../../db/enums/search-strategy'
import { ProductGroupService } from '../product-group'
import { EnumProductValueType } from '../../db/enums/product-value-type'
import { pg } from '../../db/connect'
import { ProductAttributeValueTable, tProductAttributeValueTable } from '../../db/tables/product-attribute-values'
import Bluebird from 'bluebird'
import { IProductAttributeTable, ProductAttributeTable } from '../../db/tables/product-attributes'
import { snakeToCamelRecord } from '../../db/helper'
import { IProductOffer } from '../../db/tables/product-offers-history'
import { ProductOfferCurrentTable } from '../../db/tables/product-offers-current'

export interface IProductSearchFilter {
  attrId: number
  productValueType: EnumProductValueType
  searchStrategy: EnumSearchStrategy
  valueId?: number | null
  valueIds?: number[]
  valueIdFrom?: number | null
  valueIdTill?: number | null
}

interface IFilterProductsProp {
  filters: IProductSearchFilter[]
  page: number
  itemsPerPage: number
}

interface ISearchProductsProp {
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
}

type tFilterResponse = tResponse & {
  attributes: IResponseAttributesWithValues[]
}

interface IProductWithOffers extends IProduct {
  offers: IProductOffer[]
}

export class ProductSearch {
  private product = new ProductService()
  private productGroup = new ProductGroupService()
  private productAttributeValueTable = new ProductAttributeValueTable()
  private productAttributeTable = new ProductAttributeTable()
  private productOfferCurrentTable = new ProductOfferCurrentTable()

  async getById( id: number ): Promise<IProduct> {
    return this.product.getById( id )
  }

  async filterProductsAndAttributeValues( productGroupId: number, params: IFilterProductsProp ): Promise<tFilterResponse> {
    const start = new Date()
    const products = await this.filterProducts( productGroupId, params )
    const attributes = await this.searchAttrValues( productGroupId, params.filters )

    // @ts-ignore
    console.log( 'searchProductsAndAttributeValues()', (new Date() - start) / 1000, 's' )

    return {
      ...products,
      attributes
    }
  }

  async getByIdWithOffers( id: number ): Promise<IProductWithOffers> {
    const product = await this.product.getById( id )
    const offers = await this.productOfferCurrentTable.getByProductId( id )

    return {
      ...product,
      offers,
    }
  }

  async searchProducts( searchStr: string, params: ISearchProductsProp ): Promise<tResponse> {
    const { page, itemsPerPage } = params
    const query = pg( 'products as p' )
      .where( 'p.show', true )

    if ( searchStr ) {
      query.whereILike( 'name', `%${ searchStr }%` )
    }

    const query2 = query.clone().select( pg.raw( 'count(*) AS count' ) )
    const [ { count: numberOfProducts } ] = await query2

    query
      .select( 'p.id' )
      .orderBy( 'p.best_price' )
      .limit( itemsPerPage )
      .offset( itemsPerPage * (page - 1) )

    const results = await query

    const products = await Bluebird.mapSeries( results, ( { id } ) => this.product.getById( id ) )

    return {
      numberOfProducts: parseInt( numberOfProducts ),
      products,
    }
  }

  private async filterProducts( productGroupId: number, {
    filters,
    page,
    itemsPerPage
  }: IFilterProductsProp ): Promise<Omit<tFilterResponse, 'attributes'>> {
    const query = pg( 'product_to_product_groups as p2pg' )//.queryBuilder()
      .from( 'product_to_product_groups as p2pg' )
      .innerJoin( 'products as p', 'p2pg.product_id', 'p.id' )
      .where( 'p.show', true )
      .where( 'p2pg.product_group_id', productGroupId )

    await Bluebird.each( filters, async ( filter ) => {
      return this.addSearchAttr( query, filter )
    } )

    const query2 = query.clone().select( pg.raw( 'count(*) AS count' ) )
    const [ { count: numberOfProducts } ] = await query2

    query
      .select( 'p.id' )
      .orderBy( 'p.best_price' )
      .limit( itemsPerPage )
      .offset( itemsPerPage * (page - 1) )

    const results = await query

    const products = await Bluebird.mapSeries( results, ( { id } ) => this.product.getById( id ) )

    return {
      numberOfProducts: parseInt( numberOfProducts ),
      products,
    }
  }

  private async searchAttrValues( productGroupId: number, filters: IProductSearchFilter[] ): Promise<any> {
    const start = new Date()

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

      response[ attribute.attrId ] = results.map( ( r: tProductAttributeValueTable ) => {
        const commonAttrs: any = {
          id: r.id,
          attrId: r.attrId
        }

        switch ( attrDef.type ) {
          case 'decimal':
            if ( r.decimalValue ) {
              return {
                ...commonAttrs,
                value: r.decimalValue
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

    // @ts-ignore
    console.log( 'searchAttrValues()', (new Date() - start) / 1000, 's' )

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
              ? fromObj.decimalValue
              : null
          }
        }

        if ( filter.valueIdTill ) {
          const tillObj = await this.productAttributeValueTable.getById( filter.valueIdTill )
          if ( tillObj ) {
            tillValue = tillObj.decimalValue
              ? tillObj.decimalValue
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
              ? tillObj.decimalValue
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
