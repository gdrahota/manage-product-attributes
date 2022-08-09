import { Promise as BluebirdPromise } from 'bluebird'
import { ProductGroupTable } from "../../db/tables/product-groups"
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from "../../db/tables/product-attributes-of-product-group"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"

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
    const { id, name, description } = productGroup
    await this.productGroupTable.update( { id, name, description } )
    return this.getById( productGroup.id )
  }
}
