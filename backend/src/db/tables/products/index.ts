import { pg } from "../../connect"
import { GenericClass } from "../_base_class"
import { camelToSnakeRecord } from "../../helper"

export interface IProductTable {
  id: number;
  name: string;
  manufacturerId: number;
  eanCode: string | null;
  manufacturerProductId: string | null;
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

  async patch( productId: number, obj: Record<any, any> ): Promise<any> {
    return pg( TABLE_NAME )
      .where( 'id', productId )
      .update( camelToSnakeRecord( obj ) )
  }

}
