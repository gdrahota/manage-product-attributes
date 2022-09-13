import { DataType } from "../../../db/enums/data-type"
import { tTableDef } from "../../index"

const tableDef: tTableDef = {
  "name": "product_offers_current",
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
    {
      "name": "total_price",
      "type": DataType.DECIMAL,
      "nullable": false
    },
  ],
  indexes: [
    {
      unique: false,
      fieldNames: [ 'product_id' ]
    },
    {
      unique: false,
      fieldNames: [ 'dealer_id' ]
    },
    {
      unique: true,
      fieldNames: [ 'dealer_id', 'product_id' ]
    },
    {
      unique: false,
      fieldNames: [ 'product_id', 'total_price' ]
    },
  ]
}

export default tableDef
