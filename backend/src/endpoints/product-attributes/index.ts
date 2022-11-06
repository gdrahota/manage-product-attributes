import { DefaultRestEndpoint } from '../_base_class'
import { IProductAttribute, ProductAttribute } from '../../services/product-attribute'

class ProductAttributeEndpoint extends DefaultRestEndpoint<IProductAttribute> {
  static registerRoutes() {
    const model = new ProductAttribute()
    return ProductAttributeEndpoint.registerDefaultRoutes( model )
  }
}

export const registerProductAttributeRoutes = () => {
  return ProductAttributeEndpoint.registerRoutes()
}
