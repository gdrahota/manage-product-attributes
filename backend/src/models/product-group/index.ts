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

  async getById( id: number ): Promise<IProductAttributesOfProductGroupTable[]> {
    return this.productAttributesOfProductGroupTable.getByProductGroup( id )
  }

  async getAll(): Promise<any[]> {
    const pgs = this.productGroupTable.getAll()

    return BluebirdPromise.mapSeries( pgs, async pg => {
      const productAttributesOfProductGroupTable = await this.productAttributesOfProductGroupTable.getByProductGroup( pg.id )

      const productAttributesOfProductGroup = await BluebirdPromise.map( productAttributesOfProductGroupTable, async productAttributesOfProductGroup => {
        const baseAttrDate = await this.productAttributeTable.getById( productAttributesOfProductGroup.attrId ) as IProductAttributeTable
        return {
          ...productAttributesOfProductGroup,
          ...baseAttrDate,
        }
      } )

      return {
        ...pg,
        attributes: productAttributesOfProductGroup
      }
    } )
  }
}
