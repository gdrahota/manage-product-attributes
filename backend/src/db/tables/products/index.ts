import { pg } from '../../connect'
import { GenericClass, IPage } from '../_base_class'
import { snakeToCamelRecord } from '../../helper'

export interface IProductTable {
  id: number
  name: string
  description: string | null
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

  async getPage( productGroupId: number, page: number, itemPerPage: number ): Promise<IPage<IProductTable>> {
    const query = pg( TABLE_NAME )
      .leftJoin( 'product_to_product_groups AS p2pg', 'products.id', 'p2pg.product_id' )
      .leftJoin( 'manufacturers AS m', 'products.manufacturer_id', 'm.id' )
      .where( 'p2pg.product_group_id', productGroupId )

    const records = await query.clone()
      .select( 'products.*' )
      .orderBy( 'm.name' )
      .orderBy( 'products.name' )
      .limit( itemPerPage )
      .offset( (page - 1) * itemPerPage )

    const [ { count } ] = await query.clone().count( '*', 'count' ) as unknown as any[]

    return {
      items: records.map( snakeToCamelRecord ) as IProductTable[],
      numberOfItems: parseInt( count ),
      page,
      itemPerPage
    }
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
