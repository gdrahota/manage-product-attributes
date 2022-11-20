import Bluebird from 'bluebird'
import {
  IProductAttributesOfProductGroupTable,
  ProductAttributesOfProductGroupTable
} from '../../db/tables/product-attributes-of-product-group'
import { EnumSearchStrategy } from '../../db/enums/search-strategy'

export const createProductAttributesOfProductGroups = async () => {
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
    {
      attrId: 2,
      productGroupId: 1,
      fractionalDigits: 0,
      position: 0,
      representationUnit: 'mm',
      representationUnitFactor: 1,
      searchStrategy: EnumSearchStrategy.BETWEEN
    },
    {
      attrId: 3,
      productGroupId: 1,
      fractionalDigits: 0,
      position: 0,
      representationUnit: 'mm',
      representationUnitFactor: 1,
      searchStrategy: EnumSearchStrategy.BETWEEN
    },
    {
      attrId: 4,
      productGroupId: 1,
      fractionalDigits: 3,
      position: 0,
      representationUnit: 'kg',
      representationUnitFactor: 0.001,
      searchStrategy: EnumSearchStrategy.BETWEEN
    },
    {
      attrId: 5,
      productGroupId: 1,
      fractionalDigits: 3,
      position: 0,
      representationUnit: 'kWp',
      representationUnitFactor: 0.001,
      searchStrategy: EnumSearchStrategy.BETWEEN
    },
  ]
  const productAttributesOfProductGroupTable = new ProductAttributesOfProductGroupTable()

  return Bluebird.each( items, item => {
    return productAttributesOfProductGroupTable.add( item )
  } )
}
