import { Request, Response, Router } from "express"
import { IProductSearchFilter, ProductSearch } from "../../models/product-search"

class ProductSearchRoutes {
  static registerRoutes() {
    const model = new ProductSearch()

    return Router().post(
      '/:productGroupId',
      ( req: Request, res: Response ) => ProductSearchRoutes.searchProduct( req, res, model )
    )
  }

  private static async searchProduct( req: Request, res: Response, model: any ): Promise<void> {
    try {
      const { filters, page, itemsPerPage } = req.body

      const results = await model.searchProductsAndAttributeValues(
        parseInt( req.params.productGroupId ),
        {
          filters: filters.filter( ( f: IProductSearchFilter ) => f.valueId || f.valueIds || f.valueIdFrom || f.valueIdTill ),
          page,
          itemsPerPage
        }
      )

      res.send( results )
    } catch
      ( err ) {
      console.error( err )
    }
  }
}

export const registerProductSearchRoutes = () => ProductSearchRoutes.registerRoutes()
