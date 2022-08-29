import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"

export interface IProductToAttributeValueTable {
  id: number
  productId: number
  productAttributeValueId: number
}

const TABLE_NAME = 'product_to_attr_values'

export class ProductToAttributeValueTable<IProductToAttributeValueTable> extends GenericClass<IProductToAttributeValueTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductId( id: number ) {
    const records = await pg( TABLE_NAME )
      .where( 'product_id', id )
      .select()

    return records.map( snakeToCamelRecord )
  }

  async deleteByProductIdAndAttributeValueId( productId: number, productAttributeValueId: number ) {
    return pg( TABLE_NAME )
      .where( camelToSnakeRecord( {
          productId,
          productAttributeValueId
        } )
      )
      .del()
  }
}
