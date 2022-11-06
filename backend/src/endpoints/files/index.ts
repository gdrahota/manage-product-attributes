import { NextFunction, Request, Response, Router } from 'express'
import { File } from '../../services/files'
import { EnumEntityName } from '../../db/tables/files'
import { errorHandler } from '../error-handler'

class FileRoutes {
  static registerRoutes() {
    return Router()
      .post( '/:entityName/:instanceId', FileRoutes.uploadCb )
      .get( '/:fileId', FileRoutes.downloadCb )
  }

  static async uploadCb( req: Request, res: Response ): Promise<void> {
    const fileModel = new File()

    if ( ! req.files || Object.keys( req.files ).length === 0 ) {
      res.status( 500 ).send( 'No files were uploaded.' )
    } else {
      const file = Object.values( req.files )[0]

      if ( ! (file instanceof Array) ) {
        try {
          const fileRecord = await fileModel.createFile( file, req.params.entityName as EnumEntityName, parseInt( req.params.instanceId ) )
          res.send( fileRecord )
        } catch ( err ) {
          res.status( 500 ).send( err )
        }
      } else {
        res.status( 400 ).send( new Error( 'Only single files accepted' ) )
      }
    }
  }

  static async downloadCb( req: Request, res: Response, next: NextFunction ): Promise<void> {
    const fileModel = new File()

    const fileMetaDate = await fileModel.getById( parseInt( req.params.id ) )

    if ( ! fileMetaDate ) {
      errorHandler( req, res, new Error( 'FILE_NOT_FOUND' ) )
      return
    }

    console.log( 'download file not implemented yet' )
  }
}

export const registerFileRoutes = () => FileRoutes.registerRoutes()
