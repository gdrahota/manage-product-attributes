import { pg } from '../../db/connect'
import { camelToSnakeRecord, snakeToCamel, snakeToCamelRecord } from '../../db/helper'
import { IProductTable } from '../../db/tables/products'

const p:IProductTable = {
  name: "",
  id: 1000,
  description: null,
  show: true,
  eanCode: "",
  manufacturerId: 2000,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null

}

const p2: Omit<IProductTable, 'id'> = {
  name: "",
  description: null,
  show: true,
  eanCode: "",
  manufacturerId: 2000,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null

}

export class ProductModel {
  private static readonly tableName = 'products'

  constructor( private readonly id: number ) {

  }

  static async add( product: Omit<IProductTable, 'id'> ): Promise<ProductModel> {
    const ids = await pg( this.tableName ).insert( camelToSnakeRecord(product) )
    return new ProductModel(ids[0])
  }

  async get(): Promise<IProductTable> {
    const records = await pg.from(ProductModel.tableName).where('id', this.id)
    
    if(records.length === 0){
      throw new Error("PRODUCT NOT FOUND")
    }
    
      return snakeToCamelRecord(records[0]) as IProductTable
    
  }

  async update( product: IProductTable ): Promise<IProductTable> {
    return p
  }

  async delete(): Promise<any> {
    return pg( ProductModel.tableName )
      .where( 'id', this.id )
      .del()
  }
}
