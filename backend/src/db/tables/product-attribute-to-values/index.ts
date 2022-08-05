import { GenericClass } from "../_base_class"

export interface IProductToAttributeValue {
  id: number
  productId: number
  productAttributeValueId: number
}

const TABLE_NAME = 'product_to_attr_values'

export class ProductToAttributeValue<IProductToAttributeValue> extends GenericClass<IProductToAttributeValue> {
  constructor() {
    super( TABLE_NAME )
  }
}
