import { GenericClass } from "../_base_class"

export interface IProductAttributeValue {
  id: number
  attrId: number
  decimalValue: number | null
  textValue: string | null
  bool_value: boolean | null
}

const TABLE_NAME = 'attr_values'

export class ProductAttributeValue<IProductAttributeValue> extends GenericClass<IProductAttributeValue> {
  constructor() {
    super( TABLE_NAME )
  }
}
