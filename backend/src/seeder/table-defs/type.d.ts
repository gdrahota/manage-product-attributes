import { DataType } from "../../db/enums/data-type"

interface IField {
  name: string
  type: DataType
  nullable?: boolean
  primary?: boolean
  default?: boolean | string | number
}

interface ITableDef {
  name: string
  fields: IField[]
}
