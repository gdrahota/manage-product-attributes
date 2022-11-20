import Bluebird from 'bluebird'
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from '../../db/tables/product-attributes-of-product-group'
import { EnumSearchStrategy } from '../../db/enums/search-strategy'

export const createAttributesOfProductAttributeGroups = async () => {
  const items: Omit<IProductAttributesOfProductGroupTable, 'id'>[] = [
    {
      attrId: 1,
      productGroupId: 1,
      fractionalDigits: 1,
      position: 0,
      representationUnit: 'cm',
      representationUnitFactor: 0.1,
      searchStrategy: EnumSearchStrategy.BETWEEN
    },
  ]
  const productAttributesOfProductGroupTable = new ProductAttributesOfProductGroupTable()

  return Bluebird.each( items, item => {
    return productAttributesOfProductGroupTable.add( item )
  } )
}
