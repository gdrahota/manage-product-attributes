import { DefaultRestEndpoint } from "../_base_class"
import { Request, Response, Router } from "express"
import { errorHandler } from "../error-handler"
import { IProductTable } from "../../db/tables/products"
import { Product } from "../../models/product"

class ProductRoutes extends DefaultRestEndpoint<IProductTable> {
  static async getByManufacturerId( req: Request, res: Response, model: any ): Promise<void> {
    try {
      const items = await model.getByManufacturerId( parseInt( req.params.manufacturerId ) )
      res.send( items )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  static async saveChanges( req: Request, res: Response ): Promise<void> {
    const model = new Product()
    await model.saveChanges( parseInt( req.params.productId ), req.body )

    const item = await model.getById( parseInt( req.params.productId ) )

    if ( item ) {
      res.send( item )
    } else {
      res.status( 404 ).send( '' )
    }
  }

  static registerRoutes() {
    const model = new Product()

    const router = Router()
      .get( '/product-group/:id', ( req: Request, res: Response ) => ProductRoutes.getByManufacturerId( req, res, model ) )
      .put( '/:productId', ProductRoutes.saveChanges )

    return ProductRoutes.registerDefaultRoutes( model, router )
  }
}

export const registerProductRoutes = () => {
  return ProductRoutes.registerRoutes()
}
