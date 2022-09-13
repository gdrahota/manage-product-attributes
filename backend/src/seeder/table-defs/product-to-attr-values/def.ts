import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "product_to_attr_values",
  "fields": [
    {
      "name": "product_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "product_attribute_value_id",
      "type": DataType.INTEGER,
      "nullable": false
    }
  ]
}
