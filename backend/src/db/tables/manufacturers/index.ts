import { GenericClass } from "../_base_class"

export interface IManufacturerTable {
  id: number;
  name: string;
  manufacturerId: string;
  eanCode: string | null;
  manufacturerProductId: string | null;
}

const TABLE_NAME = 'manufacturers'

export class ManufacturerTable extends GenericClass<IManufacturerTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
