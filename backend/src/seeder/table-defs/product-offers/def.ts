import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "product_offers",
  "fields": [
    {
      "name": "import_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "product_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "dealer_id",
      "type": DataType.INTEGER,
      "nullable": false
    },
    {
      "name": "item_price",
      "type": DataType.DECIMAL,
      "nullable": false
    },
    {
      "name": "shipping_price",
      "type": DataType.DECIMAL,
      "nullable": false
    },
  ]
}
