import { ProductAttributeValueTable, tProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { ProductAttribute } from "../product-attribute"
import { IAttributeValue } from "../product"
import { EnumProductValueType } from "../../db/enums/product-value-type"

export class ProductAttributeValue {
  private productAttributeValueTable = new ProductAttributeValueTable()
  private productAttribute = new ProductAttribute()

  async getById( id: number, type?: string ): Promise<IAttributeValue | null> {
    const item = await this.productAttributeValueTable.getById( id )

    if ( item ) {
      if ( ! type ) {
        const attrDef = await this.productAttribute.getById( item.attrId )

        if ( ! attrDef ) {
          throw Error()
        }

        type = attrDef.type
      }

      const response: any = {
        id: item.id,
        attrId: item.attrId,
      }

      switch ( type ) {
        case EnumProductValueType.DECIMAL:
          response.value = item.decimalValue
      }

      return response as IAttributeValue
    }

    return null
  }

  async getAll(): Promise<tProductAttributeValueTable[]> {
    return this.productAttributeValueTable.getAll()
  }

  async update( item: tProductAttributeValueTable ): Promise<tProductAttributeValueTable> {
    return this.productAttributeValueTable.update( item )
  }

  async add( attrValue: Omit<tProductAttributeValueTable, 'id'> ): Promise<IAttributeValue | null> {
    const valueAlreadyExist = await this.productAttributeValueTable.doesValueExist( attrValue )

    const attrDef = await this.productAttribute.getById( attrValue.attrId )

    if ( valueAlreadyExist ) {
      return this.getById( valueAlreadyExist.id, attrDef?.type )
    }


    const newItem = await this.productAttributeValueTable.add( attrValue )

    return this.getById( newItem.id, attrDef?.type )
  }
}
