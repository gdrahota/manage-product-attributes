import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"

export type tProductAttributeValueTable = {
  id: number
  attrId: number
  decimalValue: number | null
  textValue: string | null
  boolValue: boolean | null
}

const TABLE_NAME = 'attr_values'

export class ProductAttributeValueTable extends GenericClass<tProductAttributeValueTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductAttributeId( attrId: number ): Promise<tProductAttributeValueTable[]> {
    const items = await pg( TABLE_NAME ).where( 'attr_id', attrId ).select()
    return items.map( snakeToCamelRecord ) as unknown as tProductAttributeValueTable[]
  }

  async doesValueExist( valueObj: Omit<tProductAttributeValueTable, 'id'> ): Promise<tProductAttributeValueTable | null> {
    const records = await pg( TABLE_NAME ).where( camelToSnakeRecord( valueObj ) )

    return records.length === 0
      ? null
      : records[0]
  }
}
