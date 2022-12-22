import { Request, Response, Router } from 'express'
import { TestProductModel } from '../../data-objects/test-product'
import {IProductTable} from "../../db/tables/products";

const getAllCb = async ( req: Request, res: Response ) => {
  const products = await TestProductModel.getAll()
  res.send( products )
}

const getById = async ( req: Request, res: Response ) => {
  const productModel = new TestProductModel( parseInt( req.params.id ) )
  const product = await productModel.get()
  res.send( product )
}

const createCb = async ( req: Request, res: Response ) => {
  const productObject = await TestProductModel.add(req.body)
  const productRecord = await productObject.get()
  res.send( productRecord )
}

const updateCb = async ( req: Request, res: Response ) => {
}

const deleteCb = async ( req: Request, res: Response ) => {
}

export const registerTestProductRoutes = (): Router => {
  const router = Router()

  router
    .get( '/', getAllCb )
    .get( '/:id', getById )
    .post( '/', createCb )
    .put( '/', updateCb )
    .delete( '/:id', deleteCb )

  return router
}
