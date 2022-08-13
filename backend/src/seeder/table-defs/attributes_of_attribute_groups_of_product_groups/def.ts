import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "attributes_of_attribute_groups_of_product_groups",
  "fields": [
    {
      "name": "attribute_group_of_product_group_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "position",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "attr_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
  ]
}
