import { IProductGroup, ProductGroup } from "../../db/tables/product-groups"
import { DefaultRestEndpoint } from "../_base_class"

class ProductGroupRestEndpoints extends DefaultRestEndpoint<IProductGroup> {
}

export const registerProductGroupRoutes = () => ProductGroupRestEndpoints.registerDefaultRoutes( new ProductGroup() )
