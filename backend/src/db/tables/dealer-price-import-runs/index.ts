import { GenericClass } from "../_base_class"
import { EnumDealerStatus } from "../../../seeder/table-defs/dealers/def"

export type tDealerPriceImportRunTable = {
  id: number
  name: string
  status: EnumDealerStatus
}

const TABLE_NAME = 'dealer-price-import-runs'

export class DealerPriceImportRunTable extends GenericClass<tDealerPriceImportRunTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
