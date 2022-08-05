import { DefaultRestEndpoint } from "../_base_class"
import { IProduct } from "../../db/tables/products"
import { Manufacturer } from "../../db/tables/manufacturers"

class ManufacturerRoutes extends DefaultRestEndpoint<IProduct> {
  static registerRoutes() {
    const model = new Manufacturer()
    return ManufacturerRoutes.registerDefaultRoutes( model )
  }
}

export const registerManufacturerRoutes = () => {
  return ManufacturerRoutes.registerRoutes()
}
