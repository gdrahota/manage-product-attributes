import { IProductGroupTable } from "../../db/tables/product-groups"
import { DefaultRestEndpoint } from "../_base_class"
import { ProductToProductGroupTable } from "../../db/tables/product-to_product-groups"

class ProductToProductGroupRestEndpoints extends DefaultRestEndpoint<IProductGroupTable> {
}

export const registerProductToProductGroupRoutes =
  () => ProductToProductGroupRestEndpoints.registerDefaultRoutes( new ProductToProductGroupTable() )
