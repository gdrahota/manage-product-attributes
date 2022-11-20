import Bluebird from 'bluebird'
import { IProductAttributeTable, ProductAttributeTable } from '../../db/tables/product-attributes'
import { EnumProductValueType } from '../../db/enums/product-value-type'

export const createProductAttributes = async () => {
  const attrs: Omit<IProductAttributeTable, 'id'>[] = [
    {
      name: 'Height',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: 'from top to bottom',
    },
    {
      name: 'Width',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: 'from left to right'
    },
    {
      name: 'Depth',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: 'from front to rear'
    },
    {
      name: 'Weight',
      type: EnumProductValueType.DECIMAL,
      unit: 'g',
      fractionalDigits: 0,
      description: 'This is the product\s weight, packing material excluded.'
    },
    {
      name: 'Peak Power',
      type: EnumProductValueType.DECIMAL,
      unit: 'Wp',
      fractionalDigits: 0,
      description: 'Peak Power is the maximum power generation possible under standard conditions.'
    },
  ]
  const productAttributeTable = new ProductAttributeTable()

  return Bluebird.each( attrs, attr => {
    return productAttributeTable.add( attr )
  } )
}
