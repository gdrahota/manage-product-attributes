import { DataType } from "../../../db/enums/data-type"

export default {
  name: "files",
  fields: [
    {
      name: "name",
      type: DataType.STRING,
      nullable: false
    },
    {
      name: "entity_name",
      type: DataType.STRING,
      nullable: false,
    },
    {
      name: "instance_id",
      type: DataType.INTEGER,
      nullable: false,
    },
    {
      name: "size",
      type: DataType.INTEGER,
      nullable: false,
    },
    {
      name: "mime_type",
      type: DataType.STRING,
      nullable: false,
    },
  ]
}
