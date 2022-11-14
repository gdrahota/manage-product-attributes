import Bluebird from 'bluebird'
import { connectToDatabases, pg } from '../../src/db/connect'
import { createTableFromModel } from '../../src/db/helper/database-table-create'
import { camelToSnakeRecord } from '../../src/db/helper'
import { ITableDef } from '../../src/seeder/table-defs/type'

export const sleep = async ( ms: number ): Promise<void> => {
  return new Promise<void>( ( resolve ) => {
    setTimeout( resolve, ms )
  } )
}

export const start = async () => {
  await connectToDatabases( 'test' )
}

export const stop = async () => {
  await pg.destroy()
}

type SetupAndTeardown = {
  setupTables: () => Promise<void>
  tearDownTables: () => Promise<void>
}

export const getSetupAndTeardownForTables = (
  tableDefs: ITableDef[],
  defaultData?: Record<string, Array<Record<string, any>>>,
  additionalTeardownTableNames?: Array<string>,
): SetupAndTeardown => {
  const setupTables = async () => {
    // to ensure that new tables can be created
    await tearDownTables()

    await Bluebird.each( tableDefs, ( tableDef ) => createTableFromModel( tableDef, 'test' ) )

    if ( defaultData ) {
      await Promise.all( Object.keys( defaultData ).map( key => {
        const tableDef = tableDefs.find( ( { name } ) => name === key )

        if ( tableDef ) {
          return pg( tableDef.name ).insert( defaultData[ key ].map( camelToSnakeRecord ) )
        }

        return Promise.resolve()
      } ) )
    }

    return sleep( 50 )
  }

  const tearDownTables = async () => {
    await Bluebird.each( tableDefs, tableDef => {
      return pg.schema.withSchema( 'test' ).dropTableIfExists( tableDef.name )
    } )

    if ( additionalTeardownTableNames ) {
      await Bluebird.each( additionalTeardownTableNames, tableName => {
        return pg.schema.withSchema( 'test' ).dropTableIfExists( tableName )
      } )
    }
  }

  return {
    setupTables,
    tearDownTables,
  }
}
