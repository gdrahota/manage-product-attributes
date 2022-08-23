import { DefaultRestEndpoint } from "../_base_class"
import { DealerTable, tDealerTable } from "../../db/tables/dealers"

class DealerRoutes extends DefaultRestEndpoint<tDealerTable> {
  static registerRoutes() {
    const model = new DealerTable()
    return DealerRoutes.registerDefaultRoutes( model )
  }
}

export const registerDealerRoutes = () => {
  return DealerRoutes.registerRoutes()
}
