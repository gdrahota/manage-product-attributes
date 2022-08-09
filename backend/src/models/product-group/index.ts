import { Promise as BluebirdPromise } from 'bluebird'
import { ProductGroupTable } from "../../db/tables/product-groups"
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from "../../db/tables/product-attributes-of-product-group"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import { camelToSnakeRecord } from "../../db/helper"

export interface IProductGroup {
  id: number
  name: string
  description: string | null,
  attributes: any[]
}

export class ProductGroup {
  private productGroupTable = new ProductGroupTable()
  private productAttributeTable = new ProductAttributeTable()
  private productAttributesOfProductGroupTable = new ProductAttributesOfProductGroupTable<IProductAttributesOfProductGroupTable>()

  async getById( id: number ): Promise<IProductGroup> {
    const baseData = await this.productGroupTable.getById( id )

    if ( ! baseData ) {
      throw Error( `NO PRODUCT GROUP WITH ID "${ id }"` )
    }

    const productAttributesOfProductGroupTable = await this.productAttributesOfProductGroupTable.getByProductGroup( id )

    const productAttributesOfProductGroup = await BluebirdPromise.map( productAttributesOfProductGroupTable, async productAttributesOfProductGroup => {
      const baseAttrDate = await this.productAttributeTable.getById( productAttributesOfProductGroup.attrId ) as IProductAttributeTable
      return {
        ...productAttributesOfProductGroup,
        ...baseAttrDate,
      }
    } )


    return {
      ...baseData,
      attributes: productAttributesOfProductGroup
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
    await BluebirdPromise.each( productGroup.attributes, attr => {
      this.productAttributesOfProductGroupTable.update( camelToSnakeRecord( {
        id: attr.attrId,
        representationUnit: attr.representationUnit,
        representationUnitFactor: attr.representationUnitFactor,
        position: attr.position,
      } ) )
    } )

    const oldAttrs = await this.productAttributesOfProductGroupTable.getByProductGroup( productGroup.id )
    const newAttrs = productGroup.attributes

    const attrsToBeDeleted = oldAttrs.filter( ( { id } ) => ! newAttrs.map( ( i: any ) => i.id ).includes( id ) )
    const attrsToBeAdded = newAttrs.filter( ( { id } ) => ! oldAttrs.map( ( i: any ) => i.attrId ).includes( id ) )

    console.log( attrsToBeDeleted, attrsToBeAdded )

    await BluebirdPromise.each( attrsToBeDeleted, ( { id } ) => {
      return this.productAttributesOfProductGroupTable.delete( id )
    } )

    await BluebirdPromise.each( attrsToBeAdded, productAttributeValueId => {
      return this.productAttributesOfProductGroupTable.add( camelToSnakeRecord( {
        productGroupId: productGroup.id,
        attrId:
        productAttributeValueId,
      } ) )
    } )

    return this.getById( productGroup.id )
  }
}
