import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "product_to_product_groups",
  "fields": [
    {
      "name": "product_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "product_group_id",
      "type": DataType.INTEGER,
      "nullable": false
    }
  ]
}
