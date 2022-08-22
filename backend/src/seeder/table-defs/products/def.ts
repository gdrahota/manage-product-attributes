import { DataType } from "../../../db/enums/data-type"

export default {
  name: "products",
  fields: [
    {
      name: "name",
      type: DataType.STRING,
      nullable: false
    },
    {
      name: "ean_code",
      type: DataType.STRING,
      nullable: true
    },
    {
      name: "manufacturer_product_id",
      type: DataType.STRING,
      nullable: true
    },
    {
      name: "manufacturer_id",
      type: DataType.INTEGER,
      nullable: false
    },
    {
      name: "description",
      type: DataType.TEXT,
      nullable: true
    },
    {
      name: "show",
      type: DataType.BOOLEAN,
      nullable: false,
      default: false,
    },
  ]
}
