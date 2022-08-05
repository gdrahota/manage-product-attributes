import { GenericClass } from "../_base_class"

interface IManufacturer {
  id: number;
  name: string;
  manufacturerId: string;
  eanCode: string | null;
  manufacturerProductId: string | null;
}

const TABLE_NAME = 'manufacturers'

export class Manufacturer extends GenericClass<IManufacturer> {
  constructor() {
    super( TABLE_NAME )
  }
}
