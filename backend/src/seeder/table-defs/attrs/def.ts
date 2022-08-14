import { DataType } from "../../../db/enums/data-type"

export default {
  "name": "attrs",
  "fields": [
    {
      "name": "name",
      "type": DataType.STRING,
      "nullable": false
    },
    {
      "name": "type",
      "type": DataType.STRING,
      "nullable": false
    },
    {
      "name": "unit",
      "type": DataType.STRING,
      "nullable": true
    },
    {
      "name": "description",
      "type": DataType.TEXT,
      "nullable": true
    },
    {
      "name": "fractional_digits",
      "type": DataType.INTEGER,
      "nullable": true
    },
  ]
}
