import { Request, Response, Router } from 'express'
import { IProductSearchFilter, ProductSearch } from '../../models/product-search'

class ProductSearchRoutes {
  static registerRoutes() {
    return Router()
      .get( '/search/:searchStr/:page?/:itemsPerPage?', ProductSearchRoutes.searchProduct )
      .get( '/:id', ProductSearchRoutes.getById )
      .post( '/:productGroupId', ProductSearchRoutes.filterProduct )
  }

  private static async getById( req: Request, res: Response ): Promise<void> {
    const model = new ProductSearch()

    try {
      const results = await model.getByIdWithOffers( parseInt( req.params.id ) )

      res.send( results )
    } catch
      ( err ) {
      console.error( err )
    }
  }

  private static async searchProduct( req: Request, res: Response ): Promise<void> {
    const model = new ProductSearch()

    const searchStr = req.params.searchStr || ''

    try {
      const params = {
        page: parseInt( req.params.page || '1' ),
        itemsPerPage: parseInt( req.params.itemsPerPage || '10' )
      }

      console.log( '==>', req.params )

      const results = await model.searchProducts( searchStr, params )

      res.send( results )
    } catch
      ( err ) {
      console.error( err )
    }
  }

  private static async filterProduct( req: Request, res: Response ): Promise<void> {
    const model = new ProductSearch()

    try {
      const { filters, page, itemsPerPage } = req.body

      const params = {
        filters: filters.filter( ( f: IProductSearchFilter ) => f.valueId || f.valueIds || f.valueIdFrom || f.valueIdTill ),
        page,
        itemsPerPage
      }

      const results = await model.filterProductsAndAttributeValues( parseInt( req.params.productGroupId ), params )

      res.send( results )
    } catch
      ( err ) {
      console.error( err )
    }
  }
}

export const registerProductSearchRoutes = () => ProductSearchRoutes.registerRoutes()
