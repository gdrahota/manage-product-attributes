import { IProductGroup } from "../../db/tables/product-groups"
import { DefaultRestEndpoint } from "../_base_class"
import { ProductToProductGroup } from "../../db/tables/product-to_product-groups"

class ProductToProductGroupRestEndpoints extends DefaultRestEndpoint<IProductGroup> {
}

export const registerProductToProductGroupRoutes = () => ProductToProductGroupRestEndpoints.registerDefaultRoutes( new ProductToProductGroup() )
