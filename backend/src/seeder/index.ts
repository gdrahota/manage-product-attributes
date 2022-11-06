import { Promise as BlueBird } from 'bluebird'
import { createTableFromModel } from '../db/helper/database-table-create'
import { DataType } from '../db/enums/data-type'

type tField = {
  name: string,
  type: DataType,
  nullable: boolean,
}

type tIndex = {
  unique: boolean,
  fieldNames: string[]
}

export type tTableDef = {
  name: string,
  fields: tField[],
  indexes?: tIndex[]
}

const dirNames: string[] = [
  'attr-values',
  'attributes-of-product-group',
  'attribute-groups-of-product-groups',
  'attrs',
  'dealers',
  'dealer-price-import-runs',
  'manufacturers',
  'files',
  'product-groups',
  'product-offers-current',
  'product-offers-history',
  'product-to-attr-values',
  'product-to-product-groups',
  'products',
  'attributes-of-attribute-groups-of-product-groups',
]

export const ensureDefaultTables = async () => {
  await BlueBird.each( dirNames, async ( dirName: string ) => {
    try {
      const tableDefDDL = require( `./table-defs/${ dirName }/def` ).default
      await createTableFromModel( tableDefDDL, 'test' )

    } catch ( err: any ) {
      if ( err.code !== '42P07' ) {
        console.error( `ERROR on ensuring default table "${ dirName }":`, err )
      }
    }
  } )
}
