import { pg } from "../../connect"
import { GenericClass } from "../_base_class"

export interface IProduct {
  id: number;
  name: string;
  manufacturerId: string;
  eanCode: string | null;
  manufacturerProductId: string | null;
}

const TABLE_NAME = 'products'

export class Product extends GenericClass<IProduct> {
  constructor() {
    super( TABLE_NAME )
  }

  getByManufacturerId( manufacturerId: number = 0 ) {
    return pg<IProduct>( TABLE_NAME )
      .where( 'manufacturer_id', manufacturerId )
      .select()
  }
}
