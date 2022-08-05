import { Request, Response, Router } from "express"
import { errorHandler } from "../error-handler"

export class DefaultRestEndpoint<T> {
  private static async getAll( req: Request, res: Response, model: any ): Promise<void> {
    try {
      const items = await model.getAll()
      res.send( items )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  private static async getById( req: Request, res: Response, model: any ): Promise<void> {
    try {
      const item = await model.getById( parseInt( req.params.id ) )
      res.send( item )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  private static async add( req: Request, res: Response, model: any ): Promise<void> {
    try {
      res.send( await model.add( req.body ) )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  private static async update( req: Request, res: Response, model: any ): Promise<void> {
    try {
      res.send( await model.update( req.body ) )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  private static async remove( req: Request, res: Response, model: any ): Promise<void> {
    try {
      await model.delete( parseInt( req.params.id ) )
      res.send( req.params.id )
    } catch ( err ) {
      errorHandler( req, res, err )
    }
  }

  static registerDefaultRoutes( model: any, router: Router = Router() ) {
    return router
      .get( '/', ( req, res ) => DefaultRestEndpoint.getAll( req, res, model ) )
      .get( '/:id', ( req, res ) => DefaultRestEndpoint.getById( req, res, model ) )
      .post( '/', ( req, res ) => DefaultRestEndpoint.add( req, res, model ) )
      .put( '/', ( req, res ) => DefaultRestEndpoint.update( req, res, model ) )
      .delete( '/:id', ( req, res ) => DefaultRestEndpoint.remove( req, res, model ) )
  }
}
