import Bluebird from 'bluebird'
import { AttributeGroupOfProductGroupTable, IAttributeGroupOfProductGroupTable } from '../../db/tables/attribute_groups_of_product_groups'

export const createAttributeGroupOfProductGroups = async () => {
  const items: Omit<IAttributeGroupOfProductGroupTable, 'id'>[] = [
    {
      name: 'Dimensions',
      description: null,
      position: 0,
      productGroupId: 1
    },
    {
      name: 'Weight',
      description: null,
      position: 1,
      productGroupId: 1
    },
    {
      name: 'Generation',
      description: null,
      position: 2,
      productGroupId: 1
    },
  ]
  const attributeGroupOfProductGroupTable = new AttributeGroupOfProductGroupTable()

  return Bluebird.each( items, item => {
    return attributeGroupOfProductGroupTable.add( item )
  } )
}
