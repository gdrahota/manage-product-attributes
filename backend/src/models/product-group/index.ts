import { Promise as BluebirdPromise } from 'bluebird'
import { ProductGroupTable } from "../../db/tables/product-groups"
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from "../../db/tables/product-attributes-of-product-group"
import { camelToSnakeRecord } from "../../db/helper"

export interface IProductGroup {
  id: number
  name: string
  description: string | null,
  attributes: any[]
}

export class ProductGroup {
  private productGroupTable = new ProductGroupTable()
  private productAttributesOfProductGroupTable = new ProductAttributesOfProductGroupTable<IProductAttributesOfProductGroupTable>()

  async getById( id: number ): Promise<IProductGroup> {
    const baseData = await this.productGroupTable.getById( id )

    if ( ! baseData ) {
      throw Error( `NO PRODUCT GROUP WITH ID "${ id }"` )
    }

    const attributes = await this.productAttributesOfProductGroupTable.getByProductGroup( id )

    return {
      ...baseData,
      attributes: attributes
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
    await BluebirdPromise.each( productGroup.attributes, async attr => {
      if ( attr.id ) {
        await this.productAttributesOfProductGroupTable.update( camelToSnakeRecord( {
          id: attr.id,
          representationUnit: attr.representationUnit,
          representationUnitFactor: attr.representationUnitFactor,
          fractionalDigits: attr.fractionalDigits,
          position: attr.position,
        } ) )
      }
    } )

    const oldAttrs = await this.productAttributesOfProductGroupTable.getByProductGroup( productGroup.id )
    const newAttrs = productGroup.attributes

    const attrsToBeDeleted = oldAttrs.filter( ( { id } ) => ! newAttrs.map( ( i: any ) => i.id ).includes( id ) )
    const attrsToBeAdded = newAttrs.filter( ( { attrId } ) => ! oldAttrs.map( ( i: any ) => i.attrId ).includes( attrId ) )

    await BluebirdPromise.each( attrsToBeDeleted, ( { id } ) => {
      return this.productAttributesOfProductGroupTable.delete( id )
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
}
