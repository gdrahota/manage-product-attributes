import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "attr_values",
  "fields": [
    {
      "name": "attr_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "decimal_value",
      "type": DataType.FLOAT,
      "nullable": true
    },
    {
      "name": "text_value",
      "type": DataType.STRING,
      "nullable": true
    },
    {
      "name": "bool_value",
      "type": DataType.BOOLEAN,
      "nullable": true
    }
  ]
}
