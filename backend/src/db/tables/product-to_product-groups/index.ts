import { GenericClass } from "../_base_class"

export interface IProductToProductGroup {
  id: number
  name: string
  description: string | null
}

const TABLE_NAME = 'product_to_product_groups'

export class ProductToProductGroup extends GenericClass<IProductToProductGroup> {
  constructor() {
    super( TABLE_NAME )
  }
}
