import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"

export interface IProductAttributeValueTable {
  id: number
  attrId: number
  decimalValue: number | null
  textValue: string | null
  boolValue: boolean | null
}

const TABLE_NAME = 'attr_values'

export class ProductAttributeValueTable<IProductAttributeValueTable> extends GenericClass<IProductAttributeValueTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductAttributeId( attrId: number ): Promise<IProductAttributeValueTable[]> {
    const items = await pg( TABLE_NAME ).where( 'attr_id', attrId ).select()
    return items.map( snakeToCamelRecord ) as unknown as IProductAttributeValueTable[]
  }
}
