import { DefaultRestEndpoint } from "../_base_class"
import { IProductTable } from "../../db/tables/products"
import { ManufacturerTable } from "../../db/tables/manufacturers"

class ManufacturerRoutes extends DefaultRestEndpoint<IProductTable> {
  static registerRoutes() {
    const model = new ManufacturerTable()
    return ManufacturerRoutes.registerDefaultRoutes( model )
  }
}

export const registerManufacturerRoutes = () => {
  return ManufacturerRoutes.registerRoutes()
}
