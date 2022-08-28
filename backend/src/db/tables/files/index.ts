import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"
import dotenv from "dotenv"

dotenv.config()

const { DO_SPACES_ENDPOINT, DO_SPACES_NAME, DO_SPACES_KEY, DO_SPACES_SECRET } = process.env


export type tFileTableRaw = {
  id: number
  name: string
  entity_name: EnumEntityName,
  instance_id: number,
  size: number,
  mime_type: string,
}

export type tFileTable = {
  id: number
  name: string
  entityName: EnumEntityName,
  instanceId: number,
  size: number,
  mimeType: string,
}

export type tMetaData = tFileTable & {
  link: string
}

export enum EnumEntityName {
  PRODUCT = 'product',
  DEALER = 'dealer',
  MANUFACTURER = 'manufacturer',
}

const TABLE_NAME = 'files'

export class FileTable extends GenericClass<tFileTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByEntityNameAndInstanceId( entityName: EnumEntityName, instanceId: number ): Promise<tMetaData[]> {
    const rawData: tFileTableRaw[] = await pg( TABLE_NAME )
      .select()
      .where( 'entity_name', entityName )
      .where( 'instance_id', instanceId )
      .orderBy( 'id' )

    const records = rawData.map( snakeToCamelRecord ) as tFileTable[]

    const addLinkCb = ( file: tFileTable ): tMetaData => ({
      ...file,
      link: `${ DO_SPACES_ENDPOINT }/${ DO_SPACES_NAME }.product-${ file.instanceId }/uploaded-file-${ file.id }`
    })

    return records.map( addLinkCb )
  }
}
