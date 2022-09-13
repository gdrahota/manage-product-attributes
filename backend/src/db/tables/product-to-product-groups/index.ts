import { pg } from "../../connect"
import { GenericClass } from "../_base_class"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"

export interface IProductToProductGroupTable {
  id: number
  productId: number
  productGroupId: number
}

const TABLE_NAME = 'product_to_product_groups'

export class ProductToProductGroupTable extends GenericClass<IProductToProductGroupTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductId( pId: number ) {
    const response = await pg( TABLE_NAME )
      .where( 'product_id', pId )
      .select()

    return response.map( snakeToCamelRecord )
  }

  async deleteByProductIdAndProductGroupId( productId: number, productGroupId: number ) {
    return pg( TABLE_NAME )
      .where( camelToSnakeRecord( {
          productId,
          productGroupId
        } )
      )
      .del()
  }
}
