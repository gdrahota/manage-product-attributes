import { DefaultRestEndpoint } from "../_base_class"
import { tProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { ProductToAttributeValueTable } from "../../db/tables/product-attribute-to-values"

class ProductToAttributeValueEndpoint extends DefaultRestEndpoint<tProductAttributeValueTable> {
  static registerRoutes() {
    const model = new ProductToAttributeValueTable()
    return ProductToAttributeValueEndpoint.registerDefaultRoutes( model )
  }
}

export const registerProductToAttributeValueRoutes = () => {
  return ProductToAttributeValueEndpoint.registerRoutes()
}
