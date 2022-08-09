import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "product_groups",
  "fields": [
    {
      "name": "name",
      "type": DataType.STRING,
      "nullable": false
    },
    {
      "name": "description",
      "type": DataType.TEXT,
      "nullable": true
    }
  ]
}
