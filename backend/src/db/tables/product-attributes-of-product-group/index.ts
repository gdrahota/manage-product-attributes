import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"

export interface IProductAttributesOfProductGroupTable {
  id: number
  productGroupId: number
  attrId: number
  representationUnit: string
  representationUnitFactor: number
  name: string
  position: number
}

const TABLE_NAME = 'attributes_of_product_group'

export class ProductAttributesOfProductGroupTable<IProductAttributesOfProductGroupTable> extends GenericClass<IProductAttributesOfProductGroupTable> {
  constructor() {
    super( TABLE_NAME )
  }

  async getByProductGroup( id: number = 0 ): Promise<IProductAttributesOfProductGroupTable[]> {
    const response = await pg<IProductAttributesOfProductGroupTable>( TABLE_NAME )
      .where( 'product_group_id', id )
      .select() as Record<string, any>

    return response.map( snakeToCamelRecord ) as unknown as IProductAttributesOfProductGroupTable[]
  }
}
