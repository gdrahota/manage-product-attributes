import { DefaultRestEndpoint } from '../_base_class'
import { AttributeGroupOfProductGroup, IAttributeGroupOfProductGroup } from '../../services/attribute-group-of-product-group'

class AttributeGroupOfProductGroupEndpoint extends DefaultRestEndpoint<IAttributeGroupOfProductGroup> {
}

export const registerProductAttributeGroupOfProductGroupRoutes = () => {
  const model = new AttributeGroupOfProductGroup()
  return AttributeGroupOfProductGroupEndpoint.registerDefaultRoutes( model )
}
