import { Knex } from "knex"
import dotenv from "dotenv"

dotenv.config()

const { POSTGRES_PORT, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER, TABLE_CATALOG, SCHEMA_NAME } = process.env

const postgresConnectionConfig = {
  client: 'pg',
  connection: 'postgresql://db:AVNS_9f1qrzBt7L2yD1nchP2@app-5b5ca2ae-44fb-47c4-88a7-4faa3d4a29e8-do-user-12230756-0.b.db.ondigitalocean.com:25060/db?sslmode=require',
  //   {
  //   host: POSTGRES_HOST,
  //   port: POSTGRES_PORT,
  //   user: POSTGRES_USER,
  //   password: POSTGRES_PASSWORD,
  //   database: TABLE_CATALOG,
  // },
  secure: true,
  debug: false,
  searchPath: [ SCHEMA_NAME ],
}

console.log( postgresConnectionConfig )

export let pg: Knex

export const connectToDatabases = (): void => {
  pg = require( 'knex' )( postgresConnectionConfig )
}

