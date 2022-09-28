import { Router } from 'express'

import { registerDealerRoutes } from './dealer'
import { registerFileRoutes } from './files'
import { registerManufacturerRoutes } from './manufacturer'
import { registerProductAttributeGroupOfProductGroupRoutes } from './product-attribute-groups-of-product-groups'
import { registerProductAttributeRoutes } from './product-attributes'
import { registerProductAttributesOfProductGroupRoutes } from './product-attributes-of-product-group'
import { registerProductAttributeValueRoutes } from './product-attribute-values'
import { registerProductGroupRoutes } from './product-group'
import { registerProductRoutes } from './product'
import { registerProductSearchRoutes } from './product-search'
import { registerProductToAttributeValueRoutes } from './product-to-attribute-values'
import { registerProductToProductGroupRoutes } from './product-to-product-group'

export const registerRoutes = ( app: Router ) => {
  const routes = Router()
    .use( '/dealers', registerDealerRoutes() )
    .use( '/files', registerFileRoutes() )
    .use( '/manufacturers', registerManufacturerRoutes() )
    .use( '/products', registerProductRoutes() )
    .use( '/product-groups', registerProductGroupRoutes() )
    .use( '/product-attributes', registerProductAttributeRoutes() )
    .use( '/product-attribute-groups-of-product-groups', registerProductAttributeGroupOfProductGroupRoutes() )
    .use( '/product-attribute-values', registerProductAttributeValueRoutes() )
    .use( '/product-attributes-of-product-groups', registerProductAttributesOfProductGroupRoutes() )
    .use( '/product-search', registerProductSearchRoutes() )
    .use( '/product-to-attribute-values', registerProductToAttributeValueRoutes() )
    .use( '/product-to-product-groups', registerProductToProductGroupRoutes() )

  app.use( '/api', routes )
}
