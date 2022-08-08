import { GenericClass } from "../_base_class"

export interface IProductAttributeTable {
  id: number
  type: string
  name: string
  unit: string | null
  description: string | null
}

const TABLE_NAME = 'attrs'

export class ProductAttributeTable<IProductAttributeTable> extends GenericClass<IProductAttributeTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
