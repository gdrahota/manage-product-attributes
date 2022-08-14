import { registerManufacturerRoutes } from "./manufacturer"
import { registerProductAttributeRoutes } from "./product-attributes"
import { registerProductAttributesOfProductGroupRoutes } from "./product-attributes-of-product-group"
import { registerProductAttributeValueRoutes } from "./product-attribute-values"
import { Router } from "express"
import { registerProductGroupRoutes } from "./product-group"
import { registerProductRoutes } from "./product"
import { registerProductToAttributeValueRoutes } from "./product-to-attribute-values"
import { registerProductToProductGroupRoutes } from "./product-to-product-group"
import { registerProductAttributeGroupOfProductGroupRoutes } from "./product-attribute-groups-of-product-groups"
import { registerProductSearchRoutes } from "./product-seach"

export const registerRoutes = ( app: Router ) => {
  const routes = Router()
    .use( '/products', registerProductRoutes() )
    .use( '/product-groups', registerProductGroupRoutes() )
    .use( '/manufacturers', registerManufacturerRoutes() )
    .use( '/product-attributes', registerProductAttributeRoutes() )
    .use( '/product-attributes-of-product-groups', registerProductAttributesOfProductGroupRoutes() )
    .use( '/product-attribute-groups-of-product-groups', registerProductAttributeGroupOfProductGroupRoutes() )
    .use( '/product-attribute-values', registerProductAttributeValueRoutes() )
    .use( '/product-to-attribute-values', registerProductToAttributeValueRoutes() )
    .use( '/product-to-product-groups', registerProductToProductGroupRoutes() )
    .use( '/product-search', registerProductSearchRoutes() )

  app.use( '/api', routes )
}
