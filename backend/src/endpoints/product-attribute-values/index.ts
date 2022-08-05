import { DefaultRestEndpoint } from "../_base_class"
import { IProductAttributeValue, ProductAttributeValue } from "../../db/tables/product-attribute-values"

class ProductAttributeValueEndpoint extends DefaultRestEndpoint<IProductAttributeValue> {
  static registerRoutes() {
    const model = new ProductAttributeValue()
    return ProductAttributeValueEndpoint.registerDefaultRoutes( model )
  }
}

export const registerProductAttributeValueRoutes = () => {
  return ProductAttributeValueEndpoint.registerRoutes()
}
