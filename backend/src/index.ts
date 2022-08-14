import express, { Express, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { connectToDatabases } from "./db/connect"
import { registerRoutes } from "./endpoints"
import { ensureDefaultTables } from "./seeder"

(async () => {
  Error.stackTraceLimit = Infinity
  dotenv.config()

  connectToDatabases()
  console.log( 'connected' )

  const app: Express = express()
  const port = process.env.PORT || 3000

  app.use( express.json() )


  const log = ( req: Request, res: Response, next: NextFunction ) => {
    console.log( 'Requested Path: ', req.path )
    next()
  }

  app.use( log )

  registerRoutes( app )

  app.listen( port, () => {
    console.log( `⚡️[server]: Server is listening on port ${ port }` )
  } )

  await ensureDefaultTables()
})()
