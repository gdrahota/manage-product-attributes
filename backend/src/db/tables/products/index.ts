import { pg } from "../../connect"
import { GenericClass } from "../_base_class"
import { snakeToCamelRecord } from "../../helper"

export interface IProductTable {
  id: number
  name: string
  description: string
  show: boolean
  manufacturerId: number
  eanCode: string | null
  manufacturerProductId: string | null
  bestPrice: number | null
  bestPriceDealerId: number | null
}

const TABLE_NAME = 'products'

export class ProductTable extends GenericClass<IProductTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByManufacturerId( manufacturerId: number = 0 ) {
    return pg<IProductTable>( TABLE_NAME )
      .where( 'manufacturer_id', manufacturerId )
      .select()
  }

  async getAllValid(): Promise<IProductTable[]> {
    const rawData = await pg<IProductTable>( TABLE_NAME )
      .where( 'show', true )
      .select()

    return rawData.map( snakeToCamelRecord ) as IProductTable[]
  }
}
