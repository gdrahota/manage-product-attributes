import Bluebird from "bluebird"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import { EnumProductValueType } from "../../db/enums/product-value-type"

export const createProductAttributes = async () => {
  const attrs: Omit<IProductAttributeTable, 'id'>[] = [
    {
      name: 'Height',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: null,
    },
    {
      name: 'Width',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: null
    },
    {
      name: 'Depth',
      type: EnumProductValueType.DECIMAL,
      unit: 'mm',
      fractionalDigits: 0,
      description: null
    },
    {
      name: 'Weight',
      type: EnumProductValueType.DECIMAL,
      unit: 'g',
      fractionalDigits: 0,
      description: null
    },
    {
      name: 'Peak Power',
      type: EnumProductValueType.DECIMAL,
      unit: 'Wp',
      fractionalDigits: 0,
      description: null
    },
  ]
  const productAttributeTable = new ProductAttributeTable()

  return Bluebird.each( attrs, attr => {
    return productAttributeTable.add( attr )
  } )
}
