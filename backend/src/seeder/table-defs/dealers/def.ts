import { DataType } from "../../../db/enums/data-type"

export enum EnumDealerStatus {
  CREATED = 'created',
  VALID = 'valid',
  PAUSED = 'paused',
  DEACTIVATED = 'deactivated',
}

export default {
  name: "dealers",
  fields: [
    {
      name: "name",
      type: DataType.STRING,
      nullable: false
    },
    {
      name: "status",
      type: DataType.STRING,
      nullable: false,
      default: EnumDealerStatus.CREATED
    },
  ]
}
