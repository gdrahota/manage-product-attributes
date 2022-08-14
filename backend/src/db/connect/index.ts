import { Knex } from "knex"
import dotenv from "dotenv"

dotenv.config()

const { DB_STRING, SCHEMA_NAME } = process.env

const postgresConnectionConfig = {
  client: 'pg',
  connection: DB_STRING,
  debug: true,
  secure: true,
  searchPath: [ SCHEMA_NAME ],
}

console.debug( '===========================' )
console.debug( postgresConnectionConfig )
console.debug( '===========================' )

export let pg: Knex

export const connectToDatabases = (): void => {
  console.log( 'trying to connect to postgres db server...' )
  pg = require( 'knex' )( postgresConnectionConfig )
}

