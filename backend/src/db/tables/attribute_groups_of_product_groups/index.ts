import { GenericClass } from "../_base_class"

export interface IAttributeGroupOfProductGroupTable {
  id: number
  productGroupId: number
  position: number
  name: string
  description: string | null
}

const TABLE_NAME = 'attribute_groups_of_product_groups'

export class AttributeGroupOfProductGroupTable<IAttributeGroupOfProductGroupTable> extends GenericClass<IAttributeGroupOfProductGroupTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
