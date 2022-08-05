import { GenericClass } from "../_base_class"
import { pg } from "../../connect"

export interface IProductAttributesOfProductGroup {
  id: number
  productGroupId: number
  attrId: number | null
  representationUnit: string
  representationUnitFactor: number
  name: string
}

const TABLE_NAME = 'attributes_of_product_group'

export class ProductAttributesOfProductGroup<IProductAttributesOfProductGroup> extends GenericClass<IProductAttributesOfProductGroup> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductGroup( id: number = 0 ): Promise<IProductAttributesOfProductGroup[]> {
    return pg<IProductAttributesOfProductGroup>( TABLE_NAME )
      .where( 'product_group_id', id )
      .select() as Promise<IProductAttributesOfProductGroup[]>
  }
}
