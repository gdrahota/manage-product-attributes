import { IAttributeValue } from "../product"
import { IProductAttributeValueTable, ProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import Bluebird from "bluebird"
import { camelToSnakeRecord } from "../../db/helper"

export interface IProductAttribute {
  id: number
  type: string
  name: string
  unit: string | null
  description: string | null
  values: IAttributeValue[]
}

export class ProductAttribute {
  private productAttributeTable = new ProductAttributeTable<IProductAttributeTable>()
  private productAttributeValueTable = new ProductAttributeValueTable<IProductAttributeValueTable>()

  async getById( id: number ): Promise<IProductAttribute | null> {
    const attr = await this.productAttributeTable.getById( id )

    if ( ! attr ) {
      throw Error( `NO PRODUCT ATTRIBUTE WITH ID "${ id }"` )
    }

    const attrValues = await this.productAttributeValueTable.getByProductAttributeId( id )

    const values = attrValues.map( attrValue => {

      let value: IAttributeValue = {
        id: attrValue.id,
        attrId: attrValue.attrId,
        value: null
      }

      switch ( attr.type ) {
        case 'decimal':
          value.value = attrValue.decimalValue
          break
        case 'text':
          value.value = attrValue.textValue
          break
        case 'boolean':
          value.value = attrValue.boolValue
          break
        default:
      }

      return value
    } )

    return {
      ...attr,
      values
    }
  }

  async getAll(): Promise<IProductAttribute[]> {
    const items = await this.productAttributeTable.getAll()

    const attrs = Bluebird.map( items, async pg => {
      return this.getById( pg.id )
    } )

    return attrs.filter( i => !! i ) as unknown as IProductAttribute[]
  }

  async update( item: IProductAttributeTable ): Promise<IProductAttribute | null> {
    await this.productAttributeTable.update( camelToSnakeRecord( item ) )

    return this.getById( item.id )
  }
}
