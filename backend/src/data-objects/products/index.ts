import { pg } from '../../db/connect'
import { IProductTable } from '../../db/tables/products'

export class ProductModel {
  private static readonly tableName = 'products'

  constructor( private readonly id: number ) {

  }

  static async add( product: Omit<IProductTable, 'id'> ): Promise<ProductModel> {
  }

  async get(): Promise<IProductTable> {
  }

  async update( product: IProductTable ): Promise<IProductTable> {
  }

  async delete(): Promise<any> {
    return pg( ProductModel.tableName )
      .where( 'id', this.id )
      .del()
  }
}
