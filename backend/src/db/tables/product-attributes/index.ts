import { GenericClass } from "../_base_class"

export interface IProductAttribute {
  id: number
  name: string
  unit: string | null
  description: string | null
}

const TABLE_NAME = 'attrs'

export class ProductAttribute<IProductAttribute> extends GenericClass<IProductAttribute> {
  constructor() {
    super( TABLE_NAME )
  }
}
