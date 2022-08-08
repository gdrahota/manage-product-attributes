import { DefaultRestEndpoint } from "../_base_class"
import { IProductAttributeValueTable, ProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { Request, Response, Router } from "express"
import { camelToSnakeRecord } from "../../db/helper"

class ProductAttributeValueEndpoint extends DefaultRestEndpoint<IProductAttributeValueTable> {
  static async addNewAttributeValueToProduct( req: Request, res: Response, model: any ) {
    const { body } = req

    const newValue = await model.add( camelToSnakeRecord( {
      attrId: body.attrId,
      decimalValue: body.decimalValue || null,
      textValue: body.textValue || null,
      boolValue: body.boolValue || null,
    } ) )

    res.send( newValue )
  }

  static registerRoutes() {
    const model = new ProductAttributeValueTable<IProductAttributeValueTable>()
    const router = Router()
      .get( '/:productAttributeId' )
      .post(
        '/:productGroupId/product-attribute/:productAttributeId',
        ( req: Request, res: Response ) => ProductAttributeValueEndpoint.addNewAttributeValueToProduct( req, res, model )
      )

    return ProductAttributeValueEndpoint.registerDefaultRoutes( model, router )
  }
}

export const registerProductAttributeValueRoutes = () => {
  return ProductAttributeValueEndpoint.registerRoutes()
}
