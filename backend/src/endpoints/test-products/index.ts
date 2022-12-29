import { Request, Response, Router } from 'express'
import { TestProductModel } from '../../data-objects/test-product'
import {IProductTable} from "../../db/tables/products";

const getAllCb = async ( req: Request, res: Response ) => {
  const products = await TestProductModel.getAll()
  res.send( products )
}

const getById = async ( req: Request, res: Response ) => {
  const productModel = new TestProductModel( parseInt( req.params.id ) )
  const productRecord = await productModel.get()
  res.send( productRecord )
}

const createCb = async ( req: Request, res: Response ) => {
  const productObject = await TestProductModel.add(req.body)
  const productRecord = await productObject.get()
  res.send( productRecord )
}

const updateCb = async ( req: Request, res: Response ) => {
  const productObject = new TestProductModel( parseInt( req.params.id ) )
  const productRecord = await productObject.update( req.body )
  res.send( productRecord )
}

const deleteCb = async ( req: Request, res: Response ) => {
  const productObject = new TestProductModel( parseInt( req.params.id ) )
  const deleteRecord = await productObject.delete()
  res.send( deleteRecord )
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
