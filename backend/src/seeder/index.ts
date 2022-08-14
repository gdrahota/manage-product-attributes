import { Promise as BlueBird } from 'bluebird'
import { createTableFromModel } from "../db/helper/database-table-create"

const dirNames: string[] = [
  'attr_values',
  'attributes_of_product_group',
  'attribute_groups_of_product_groups',
  'attrs',
  'manufacturers',
  'product_groups',
  'product_to_attr_values',
  'product_to_product_groups',
  'products',
  'attributes_of_attribute_groups_of_product_groups',
]

export const ensureDefaultTables = async () => {
  await BlueBird.each( dirNames, async ( dirName: string ) => {
    try {
      const tableDefDDL = require( `./table-defs/${ dirName }/def` ).default
      await createTableFromModel( tableDefDDL )
    } catch ( err ) {
      console.error( `ERROR on ensuring default table "${ dirNames }":`, err )
    }
  } )
}
