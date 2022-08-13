import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"

export interface IAttributeOfAttributeGroupOfProductGroupTable {
  id: number
  attributeGroupOfProductGroupId: number
  position: number
  attrId: number
  description: string | null
}

const TABLE_NAME = 'attributes_of_attribute_groups_of_product_groups'

export class AttributeOfAttributeGroupOfProductGroupTable<IAttributeOfAttributeGroupOfProductGroupTable> extends GenericClass<IAttributeOfAttributeGroupOfProductGroupTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByAttributeGroupOfProductGroupId( id: number = 0 ): Promise<IAttributeOfAttributeGroupOfProductGroupTable[]> {
    const response = await pg( TABLE_NAME )
      .where( 'attribute_group_of_product_group_id', id )
      .select()

    return response.map( snakeToCamelRecord ) as IAttributeOfAttributeGroupOfProductGroupTable[]
  }
}
