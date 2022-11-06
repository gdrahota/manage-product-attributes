import { Promise as BluebirdPromise } from 'bluebird'
import { ProductGroupTable } from '../../db/tables/product-groups'
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from '../../db/tables/product-attributes-of-product-group'
import { camelToSnakeRecord } from '../../db/helper'
import { pg } from '../../db/connect'

export interface IProductGroup {
  id: number
  name: string
  description: string | null,
  attributes: IProductAttributesOfProductGroupTable[]
}

export class ProductGroupService {
  private productGroupTable = new ProductGroupTable()
  private productAttributesOfProductGroupTable = new ProductAttributesOfProductGroupTable<IProductAttributesOfProductGroupTable>()

  async getById( id: number ): Promise<IProductGroup> {
    const baseData = await this.productGroupTable.getById( id )

    if ( ! baseData ) {
      throw Error( `NO PRODUCT GROUP WITH ID "${ id }"` )
    }

    const attributes = await this.productAttributesOfProductGroupTable.getByProductGroup( id )

    const correctType = ( i: IProductAttributesOfProductGroupTable ) => {
      return {
        ...i,
        representationUnitFactor: i.representationUnitFactor
          ? parseFloat( <string>i.representationUnitFactor )
          : null
      }
    }

    return {
      ...baseData,
      attributes: attributes.map( correctType )
    }
  }

  async getAll(): Promise<IProductGroup[]> {
    const pgs = this.productGroupTable.getAll()

    return BluebirdPromise.mapSeries( pgs, async ( { id } ) => {
      return this.getById( id )
    } )
  }

  async update( productGroup: IProductGroup ): Promise<IProductGroup | null> {
    const { id, name, description, attributes } = productGroup
    await this.productGroupTable.update( { id, name, description } )

    // check product group's attributes
    await BluebirdPromise.each( attributes, async attr => {
      if ( attr.id ) {
        await this.productAttributesOfProductGroupTable.update( camelToSnakeRecord( {
          id: attr.id,
          representationUnit: attr.representationUnit,
          representationUnitFactor: attr.representationUnitFactor,
          fractionalDigits: attr.fractionalDigits,
          position: attr.position,
          searchStrategy: attr.searchStrategy,
        } ) )
      }
    } )

    const oldAttrs = await this.productAttributesOfProductGroupTable.getByProductGroup( productGroup.id )
    const newAttrs = attributes

    const attrsToBeDeleted = oldAttrs.filter( ( { id } ) => ! newAttrs.map( ( i: any ) => i.id ).includes( id ) )
    const attrsToBeAdded = newAttrs.filter( ( { attrId } ) => ! oldAttrs.map( ( i: any ) => i.attrId ).includes( attrId ) )

    await BluebirdPromise.each( attrsToBeDeleted, async attrToBeDeleted => {
      await this.removeAttributeValue( attrToBeDeleted.attrId, productGroup.id )

      return this.productAttributesOfProductGroupTable.delete( attrToBeDeleted.id )
    } )

    await BluebirdPromise.each( attrsToBeAdded, attr => {
      return this.productAttributesOfProductGroupTable.add( camelToSnakeRecord( {
        productGroupId: productGroup.id,
        attrId: attr.attrId,
        representationUnit: attr.representationUnit,
        representationUnitFactor: attr.representationUnitFactor,
        fractionalDigits: attr.fractionalDigits,
        position: attr.position,
      } ) )
    } )

    return this.getById( productGroup.id )
  }

  async add( item: Omit<IProductGroup, 'id'> ): Promise<IProductGroup | null> {
    const { name, description } = item
    const newItem = await this.productGroupTable.add( camelToSnakeRecord( { name, description } ) )
    return this.getById( newItem.id )
  }

  private async removeAttributeValue( attrId: number, productGroupId: number ): Promise<void> {
    const products = pg.queryBuilder()
      .select( 'product_to_attr_values.id', 'product_to_attr_values.product_id' )
      .from( 'attr_values' )
      .innerJoin( 'product_to_attr_values', 'attr_values.id', 'product_to_attr_values.product_attribute_value_id' )
      .where( 'attr_values.attr_id', attrId )

    await BluebirdPromise.each( await products, async product => {
      const productGroups = await pg.queryBuilder()
        .select( 'product_group_id' )
        .from( 'product_to_product_groups' )
        .where( 'product_id', product.product_id )

      let productGroupCounter: number = 0

      await BluebirdPromise.each( productGroups, async productGroup => {
        const numberOfProductGroups: any[] = await pg.queryBuilder()
          .count( '*' )
          .from( 'attributes_of_product_group' )
          .where( 'product_group_id', productGroup.product_group_id )
          .where( 'attr_id', attrId )
          .whereNot( 'product_group_id', productGroupId )

        productGroupCounter += parseInt( numberOfProductGroups[0].count )

      } )

      if ( productGroupCounter === 0 ) {
        await pg.queryBuilder().from( 'product_to_attr_values' ).where( product ).del()
      }
    } )
  }
}
