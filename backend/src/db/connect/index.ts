import { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const { DB_STRING } = process.env

const postgresConnectionConfig: any = {
  client: 'pg',
  connection: DB_STRING,
  debug: false,
  secure: true,
}

export let pg: Knex

export const connectToDatabases = ( dbSchemaName: string = 'public' ): void => {
  postgresConnectionConfig.searchPath = [ dbSchemaName ]
  pg = require( 'knex' )( postgresConnectionConfig )
}
