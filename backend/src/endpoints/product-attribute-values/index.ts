import { DefaultRestEndpoint } from '../_base_class'
import { tProductAttributeValueTable } from '../../db/tables/product-attribute-values'
import { ProductAttributeValue } from '../../services/product-attribute-value'

class ProductAttributeValueEndpoint extends DefaultRestEndpoint<tProductAttributeValueTable> {
  static registerRoutes() {
    const model = new ProductAttributeValue()
    return ProductAttributeValueEndpoint.registerDefaultRoutes( model )
  }
}

export const registerProductAttributeValueRoutes = () => ProductAttributeValueEndpoint.registerRoutes()
