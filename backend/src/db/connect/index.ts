import { Knex } from "knex"
import dotenv from "dotenv"

dotenv.config()

const { POSTGRES_PORT, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, TABLE_CATALOG, SCHEMA_NAME } = process.env

const postgresConnectionConfig = {
  client: 'pg',
  connection: {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: TABLE_CATALOG,
  },
  debug: false,
  searchPath: [ SCHEMA_NAME ],
}

export let pg: Knex

export const connectToDatabases = (): void => {
  pg = require( 'knex' )( postgresConnectionConfig )
}

