import { GenericClass } from "../_base_class"
import { EnumDealerStatus } from "../../../seeder/table-defs/dealers/def"

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
}
