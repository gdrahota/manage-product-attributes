import { GenericClass } from "../_base_class"

export interface IProductGroupTable {
  id: number
  name: string
  description: string | null
}

const TABLE_NAME = 'product_groups'

export class ProductGroupTable extends GenericClass<IProductGroupTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
