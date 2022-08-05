import { GenericClass } from "../_base_class"

export interface IProductGroup {
  id: number
  name: string
  description: string | null
}

const TABLE_NAME = 'product_groups'

export class ProductGroup extends GenericClass<IProductGroup> {
  constructor() {
    super( TABLE_NAME )
  }
}
