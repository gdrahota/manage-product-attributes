import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "attributes_of_product_group",
  "fields": [
    {
      "name": "product_group_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "attr_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "representation_unit",
      "type": DataType.STRING,
      "nullable": true
    },
    {
      "name": "representation_unit_factor",
      "type": DataType.FLOAT,
      "nullable": true
    },
    {
      "name": "fractional_digits",
      "type": DataType.INTEGER,
      "nullable": true
    },
    {
      "name": "position",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "search_strategy",
      "type": DataType.STRING,
      "nullable": true
    },
  ]
}
