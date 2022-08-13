import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "attribute_groups_of_product_groups",
  "fields": [
    {
      "name": "product_group_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "position",
      "type": DataType.INTEGER,
      "nullable": false
    },
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
