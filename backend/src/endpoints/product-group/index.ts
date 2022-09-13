import { IProductGroupTable } from "../../db/tables/product-groups"
import { DefaultRestEndpoint } from "../_base_class"
import { ProductGroupService } from "../../models/product-group"

class ProductGroupRestEndpoints extends DefaultRestEndpoint<IProductGroupTable> {
  static registerRoutes() {
    const model = new ProductGroupService()
    return ProductGroupRestEndpoints.registerDefaultRoutes( model )
  }
}

export const registerProductGroupRoutes = () => ProductGroupRestEndpoints.registerRoutes()
