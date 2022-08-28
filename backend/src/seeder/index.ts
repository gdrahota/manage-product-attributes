import { Promise as BlueBird } from 'bluebird'
import { createTableFromModel } from "../db/helper/database-table-create"

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
  'product-offers',
  'product-to-attr-values',
  'product-to-product-groups',
  'products',
  'attributes-of-attribute-groups-of-product-groups',
]

export const ensureDefaultTables = async () => {
  await BlueBird.each( dirNames, async ( dirName: string ) => {
    try {
      const tableDefDDL = require( `./table-defs/${ dirName }/def` ).default
      await createTableFromModel( tableDefDDL )
    } catch ( err: any ) {
      if ( err.code !== '42P07' ) {
        console.error( `ERROR on ensuring default table "${ dirNames }":`, err )
      }
    }
  } )
}
