import Bluebird from 'bluebird'
import {
  AttributeOfAttributeGroupOfProductGroupTable,
  IAttributeOfAttributeGroupOfProductGroupTable
} from '../../db/tables/attributes-of-attribute-groups-of-product-groups'

export const createAttributeOfAttributeGroupOfProductGroup = async () => {
  const items: Omit<IAttributeOfAttributeGroupOfProductGroupTable, 'id'>[] = [
    {
      attrId: 1,
      attributeGroupOfProductGroupId: 1,
      position: 0,
    },
    {
      attrId: 2,
      attributeGroupOfProductGroupId: 1,
      position: 1,
    },
    {
      attrId: 3,
      attributeGroupOfProductGroupId: 1,
      position: 2,
    },
    {
      attrId: 4,
      attributeGroupOfProductGroupId: 2,
      position: 0,
    },
    {
      attrId: 5,
      attributeGroupOfProductGroupId: 3,
      position: 0,
    },
  ]

  const attributeOfAttributeGroupOfProductGroupTable = new AttributeOfAttributeGroupOfProductGroupTable()

  return Bluebird.each( items, item => {
    return attributeOfAttributeGroupOfProductGroupTable.add( item )
  } )
}
