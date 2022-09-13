import Bluebird from "bluebird"
import { IProductGroupTable, ProductGroupTable } from "../../db/tables/product-groups"

export const createProductGroups = async () => {
  const productGroups: Omit<IProductGroupTable, 'id'>[] = [
    {
      name: 'PV Modules',
      description: null,
    },
    {
      name: 'Inverters',
      description: null,
    },
    {
      name: 'Solar Chargers',
      description: null,
    },
    {
      name: 'PV Module Mount Systems',
      description: null,
    },
  ]
  const productGroupTable = new ProductGroupTable()

  return Bluebird.each( productGroups, productGroup => {
    return productGroupTable.add( productGroup )
  } )
}
