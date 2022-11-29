import { getSetupAndTeardownForTables, start, stop } from '../../../tests/setup'
import { ProductModel } from './index'

import productTableDef from '../../seeder/table-defs/products/def'
import { IProductTable } from '../../db/tables/products'
import { pg } from '../../db/connect'
import { snakeToCamelRecord } from '../../db/helper'

const { setupTables, tearDownTables } = getSetupAndTeardownForTables(
  [ productTableDef ],
  {},
)

beforeAll( start )

beforeEach( setupTables )

afterEach( tearDownTables )

afterAll( stop )

const p1: Omit<IProductTable, 'id'> = {
  name: 'product 1',
  description: null,
  eanCode: 'ean-code-123',
  manufacturerId: 1,
  manufacturerProductId: 'manufacturer-product-id-1',
  show: false,
  bestPrice: null,
  bestPriceDealerId: null
}

const p2: Omit<IProductTable, 'id'> = {
  name: 'product 2',
  description: null,
  eanCode: 'ean-code-987',
  manufacturerId: 2,
  manufacturerProductId: 'manufacturer-product-id-2',
  show: false,
  bestPrice: null,
  bestPriceDealerId: null
}

describe( 'data objects -> products', () => {
  describe( 'add()', () => {
    test( 'should add the product', async () => {
      await ProductModel.add( p1 )

      const test = (await pg( 'products' )).map( snakeToCamelRecord )
      expect( test ).toHaveLength( 1 )
      expect( test[ 0 ].name ).toEqual( p1.name )
      expect( test[ 0 ].eanCode ).toEqual( p1.eanCode )
    } )

    test( 'should two the products', async () => {
      await ProductModel.add( p1 )
      await ProductModel.add( p2 )

      const test = (await pg( 'products' )).map( snakeToCamelRecord )
      expect( test ).toHaveLength( 2 )
      expect( test[ 0 ].name ).toEqual( p1.name )
      expect( test[ 0 ].eanCode ).toEqual( p1.eanCode )
      expect( test[ 1 ].name ).toEqual( p2.name )
      expect( test[ 1 ].eanCode ).toEqual( p2.eanCode )
    } )

    test( 'missing name value should add throw', async () => {
      await expect( () => ProductModel.add( {} as Partial<IProductTable> as IProductTable ) )
        .rejects.toThrow( 'null value in column "name" of relation "products" violates not-null constraint' )
    } )

    test( 'missing manufacturerId value should add throw', async () => {
      const p = {
        name: 'p-1',
      } as Partial<IProductTable> as IProductTable

      await expect( () => ProductModel.add( p ) )
        .rejects.toThrow( 'null value in column "manufacturer_id" of relation "products" violates not-null constraint' )
    } )

    describe( 'get()', () => {
      test( 'get() should get one product out of one', async () => {
        await ProductModel.add( p1 )

        const product = new ProductModel( 1 )
        const test = await product.get()

        expect( test.name ).toEqual( p1.name )
      } )

      test( 'get() should get first product out of two', async () => {
        await ProductModel.add( p1 )
        await ProductModel.add( p2 )

        const product = new ProductModel( 1 )
        const test = await product.get()

        expect( test.name ).toEqual( p1.name )
      } )

      test( 'get() should get second product out of two', async () => {
        await ProductModel.add( p1 )
        await ProductModel.add( p2 )

        const product = new ProductModel( 2 )
        const test = await product.get()

        expect( test.name ).toEqual( p2.name )
      } )

      test( 'get() should get second product out of two having correct eanCode', async () => {
        await ProductModel.add( p1 )
        await ProductModel.add( p2 )

        const product = new ProductModel( 2 )
        const test = await product.get()

        expect( test.eanCode ).toEqual( p2.eanCode )
      } )

      test( 'get() should throw "PRODUCT NOT FOUND"', async () => {
        const product = new ProductModel( 2 )
        await expect( () => product.get() ).rejects.toThrow( 'PRODUCT NOT FOUND' )
      } )

      test( 'get() should get second product out of two having correct eanCode', async () => {
        await ProductModel.add( p1 )
        await ProductModel.add( p2 )

        const product = new ProductModel( 2 )
        const test = await product.get()

        expect( test.eanCode ).toEqual( p2.eanCode )
      } )
    } )
  } )
} )
