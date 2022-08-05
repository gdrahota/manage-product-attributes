import { DefaultRestEndpoint } from "../_base_class"
import { Request, Response, Router } from "express"
import { errorHandler } from "../error-handler"
import { IProduct, Product } from "../../db/tables/products"

class ProductRoutes extends DefaultRestEndpoint<IProduct> {
  static async getByManufacturerId( req: Request, res: Response, model: any ): Promise<void> {
    try {
      const items = await model.getByManufacturerId( parseInt( req.params.manufacturerId ) )
      res.send( items )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  static registerRoutes() {
    const model = new Product()

    const router = Router()
      .use( '/product-group/:id', ( req: Request, res: Response ) => ProductRoutes.getByManufacturerId( req, res, model ) )

    return ProductRoutes.registerDefaultRoutes( model, router )
  }
}

export const registerProductRoutes = () => {
  return ProductRoutes.registerRoutes()
}
