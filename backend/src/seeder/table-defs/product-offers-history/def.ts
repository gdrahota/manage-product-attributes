import { DataType } from "../../../db/enums/data-type"
import { tTableDef } from "../../index"

const tableDef: tTableDef = {
  "name": "product_offers_history",
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
      unique: true,
      fieldNames: [ 'import_id', 'product_id' ]
    },
    {
      unique: false,
      fieldNames: [ 'dealer_id' ]
    },
    {
      unique: false,
      fieldNames: [ 'dealer_id', 'product_id' ]
    },
    {
      unique: false,
      fieldNames: [ 'product_id', 'total_price' ]
    },
  ]
}

export default tableDef
