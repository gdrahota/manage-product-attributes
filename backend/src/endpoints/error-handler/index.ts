import { Request, Response } from 'express'

export const errorHandler = ( req: Request, res: Response, err: any ) => {
  console.error( 'ERROR', err )
  if ( ! res.headersSent ) {
    res.status( err.status || 500 ).send( err.message )
  }
}
