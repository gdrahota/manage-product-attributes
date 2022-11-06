import { connectToDatabases, pg } from '../../src/db/connect'
import Bluebird from 'bluebird'

export const sleep = async ( ms: number ): Promise<void> => {
  return new Promise<void>( ( resolve ) => {
    setTimeout( resolve, ms )
  } )
}

const getAllTables = async (): Promise<string[]> => {
  const response: any[] = await pg.select( 'table_name' ).from( 'information_schema.tables' ).where( 'table_schema', 'test' )

  // @ts-ignore
  return response.map( ( { table_name } ) => table_name )
}

export const dropAllTables = async (): Promise<void> => {
  const tableNames = await getAllTables()

  await Bluebird.each( tableNames, async tableName => {
    await pg.schema.dropTable( `${ tableName }` ).then().catch( err => {
      console.log( '==>> ==>>', err )
    } )
  } )
}

export const start = async () => {
  await connectToDatabases( 'test' )
}

export const stop = async () => {
  await pg.destroy()
}
