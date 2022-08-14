import express, { Express } from 'express'
import dotenv from 'dotenv'
import { connectToDatabases } from "./db/connect"
import { registerRoutes } from "./endpoints"
import { ensureDefaultTables } from "./seeder"

(async () => {
  Error.stackTraceLimit = Infinity
  dotenv.config()

  connectToDatabases()
  await ensureDefaultTables()

  const app: Express = express()
  const port = process.env.PORT || 3000

  app.use( express.json() )

  registerRoutes( app )

  app.listen( port, () => {
    console.log( `⚡️[server]: Server is listening on port ${ port }` )
  } )
})()
