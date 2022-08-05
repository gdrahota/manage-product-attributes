import { DefaultRestEndpoint } from "../_base_class"
import { IProductAttributeValue } from "../../db/tables/product-attribute-values"
import { ProductToAttributeValue } from "../../db/tables/product-attribute-to-values"

class ProductToAttributeValueEndpoint extends DefaultRestEndpoint<IProductAttributeValue> {
  static registerRoutes() {
    const model = new ProductToAttributeValue()
    return ProductToAttributeValueEndpoint.registerDefaultRoutes( model )
  }
}

export const registerProductToAttributeValueRoutes = () => {
  return ProductToAttributeValueEndpoint.registerRoutes()
}
