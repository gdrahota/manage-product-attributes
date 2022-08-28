import { GenericClass } from "../_base_class"
import { EnumDealerStatus } from "../../../seeder/table-defs/dealers/def"
import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"

export type tDealerTable = {
  id: number
  name: string
  status: EnumDealerStatus
}

const TABLE_NAME = 'dealers'

export class DealerTable extends GenericClass<tDealerTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByStatus( status: EnumDealerStatus ): Promise<tDealerTable[]> {
    const rawData = await pg( TABLE_NAME )
      .select()
      .where( 'status', status )
      .orderBy( 'id' )

    return rawData.map( snakeToCamelRecord ) as tDealerTable[]
  }
}
