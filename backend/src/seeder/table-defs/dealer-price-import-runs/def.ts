import { DataType } from "../../../db/enums/data-type"

export default {
  name: "dealer-price-import-runs",
  fields: [
    {
      name: "dealer_id",
      type: DataType.INTEGER,
      nullable: false
    },
    {
      name: "created_at",
      type: DataType.DATE,
      nullable: false,
      default: 'NOW()',
    },
  ]
}
