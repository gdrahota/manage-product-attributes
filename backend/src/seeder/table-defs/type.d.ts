import { DataType } from "../../db/enums/data-type"

interface IField {
  name: string
  type: DataType
  nullable?: boolean
  primary?: boolean
}

interface ITableDef {
  name: string
  fields: IField[]
}
