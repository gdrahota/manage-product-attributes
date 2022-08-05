import { DefaultRestEndpoint } from "../_base_class"
import { errorHandler } from "../error-handler"
import { Request, Response, Router } from "express"
import { IProductAttributesOfProductGroup, ProductAttributesOfProductGroup } from "../../db/tables/product-attributes-of-product-group"

class ProductAttributesOfProductGroupRoutes extends DefaultRestEndpoint<IProductAttributesOfProductGroup> {
  private static async getByProductGroup( req: Request, res: Response ): Promise<void> {
    try {
      const productAttributesOfProductGroup = new ProductAttributesOfProductGroup<IProductAttributesOfProductGroup>()
      const items = await productAttributesOfProductGroup.getByProductGroup( parseInt( req.params.id ) )
      res.send( items )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  static registerRoutes() {
    const model = new ProductAttributesOfProductGroup()

    const router = Router().use( '/product-group/:id', ProductAttributesOfProductGroupRoutes.getByProductGroup )

    return ProductAttributesOfProductGroupRoutes.registerDefaultRoutes( model, router )
  }
}

export const registerProductAttributesOfProductGroupRoutes = () => {
  return ProductAttributesOfProductGroupRoutes.registerRoutes()
}
