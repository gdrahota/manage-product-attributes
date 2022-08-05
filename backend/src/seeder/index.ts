import { Promise as BlueBird } from 'bluebird'
import { createTableFromModel } from "../db/helper/database-table-create"

const dirNames: string[] = [
  'attr_values',
  'attributes_of_product_group',
  'attrs',
  'manufacturers',
  'product_groups',
  'product_to_attr_value',
  'product_to_product_groups',
  'products',
]

export const ensureDefaultTables = async () => {
  await BlueBird.each( dirNames, async ( dirName: string ) => {
    try {
      const tableDefDDL = require( `./table-defs/${ dirName }/def` ).default
      await createTableFromModel( tableDefDDL )
    } catch ( err ) {
      // noop
    }
  } )
}
