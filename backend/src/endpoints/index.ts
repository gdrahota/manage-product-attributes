import { registerManufacturerRoutes } from "./manufacturer"
import { registerProductAttributeRoutes } from "./product-attributes"
import { registerProductAttributesOfProductGroupRoutes } from "./product-attributes-of-product-group"
import { registerProductAttributeValueRoutes } from "./product-attribute-values"
import { Router } from "express"
import { registerProductGroupRoutes } from "./product-group"
import { registerProductRoutes } from "./product"
import { registerProductToAttributeValueRoutes } from "./product-to-attribute-values"
import { registerProductToProductGroupRoutes } from "./product-to-product-group"

export const registerRoutes = ( app: Router ) => {
  const routes = Router()
    .use( '/product', registerProductRoutes() )
    .use( '/product-group', registerProductGroupRoutes() )
    .use( '/manufacturer', registerManufacturerRoutes() )
    .use( '/product-attributes', registerProductAttributeRoutes() )
    .use( '/product-attributes-of-product-group', registerProductAttributesOfProductGroupRoutes() )
    .use( '/product-attribute-value', registerProductAttributeValueRoutes() )
    .use( '/product-to-attribute-value', registerProductToAttributeValueRoutes() )
    .use( '/product-to-product-group', registerProductToProductGroupRoutes() )

  app.use( '/api', routes )
}
