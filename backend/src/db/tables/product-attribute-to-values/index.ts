import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { Promise as BluebirdPromise } from 'bluebird'
import { camelToSnakeRecord } from "../../helper"

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
    const records = pg( TABLE_NAME )
      .where( 'product_id', id )
      .select()

    return BluebirdPromise.map( records, ( { id } ) => {
      return this.getById( id )
    } )
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
