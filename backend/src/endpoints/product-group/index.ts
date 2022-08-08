import { IProductGroupTable } from "../../db/tables/product-groups"
import { DefaultRestEndpoint } from "../_base_class"
import { ProductGroup } from "../../models/product-group"

class ProductGroupRestEndpoints extends DefaultRestEndpoint<IProductGroupTable> {
  static registerRoutes() {
    const model = new ProductGroup()
    return ProductGroupRestEndpoints.registerDefaultRoutes( model )
  }
}

export const registerProductGroupRoutes = () => ProductGroupRestEndpoints.registerRoutes()
