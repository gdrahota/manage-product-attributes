import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import { getSetupAndTeardownForTables, start, stop } from '../../../tests/setup'

import productTableDef from '../../seeder/table-defs/products/def'
import { IProductTable } from '../../db/tables/products'
import { pg } from '../../db/connect'
import { snakeToCamelRecord } from '../../db/helper'

import { TestProductModel } from './index'

const { setupTables, tearDownTables } = getSetupAndTeardownForTables(
  [ productTableDef ],
  {},
)

const testProd1: IProductTable = {
  id: 1000,
  name: '',
  description: null,
  show: true,
  eanCode: '',
  manufacturerId: 2000,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null
}

const testProd2: Omit<IProductTable, 'id'> = {
  name: 'Apfelgetränk',
  description: null,
  show: true,
  eanCode: '',
  manufacturerId: 2000,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null
}

const testProd3: Object = {
  name: 'Schnitzel'
}

//@ts-ignore
const productWithoutName: IProductTable = {
  description: null,
  show: true,
  eanCode: '',
  manufacturerId: 2000,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null
}

const productWithWrongAttributeTypes: IProductTable = {
  //@ts-ignore
  description: 2,
  //@ts-ignore
  show: 'true',
  eanCode: '',
  //@ts-ignore
  manufacturerId: true,
  manufacturerProductId: null,
  bestPrice: null,
  bestPriceDealerId: null
}

const productWithNonExistingAttributes: Object = {
  name: 'Non-existing attribute',
  description: '',
  availability: true,
  serialNo: '',
  manufacturerId: 2000,
  SupplierId: 3,
  worsePrice: 4000,
  bestPriceDealerId: 1
}

beforeAll( start )

beforeEach( setupTables )

afterEach( tearDownTables )

afterAll( stop )


describe( 'data objects -> test products', () => {
  describe( 'add()', () => {
    test( 'should add a product', async () => {
      await TestProductModel.add( testProd2 )

      const test = (await pg( 'products' )).map( snakeToCamelRecord )
      expect( test ).toHaveLength( 1 )
      expect( test[ 0 ].name ).toEqual( testProd2.name )
    } )

    test( 'should add a product with properties provided', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      expect( testProd2.name ).toEqual( expect.stringMatching( record.name ) )
    } )

    test( 'should return the new product', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect( test ).toBeInstanceOf( TestProductModel )
      const record = await test.get()

      expect( record.id ).toEqual( 1 )

      expect( record ).toMatchObject( testProd2 )
    } )

    test( 'should remove ID field and replace it', async () => {
      const test = await TestProductModel.add( testProd1 )

      const record = await test.get()

      expect( record.id ).not.toEqual( testProd1.id )
    } )

    test( 'should throw "AT LEAST ONE REQUIRED FIELD MISSING"', async () => {
      await expect( () => TestProductModel.add( productWithoutName ) )
        .rejects.toThrow( 'AT LEAST ONE REQUIRED FIELD MISSING' )
    } )

    test( 'should throw "AT LEAST ONE FIELD IS OF A WRONG VALUE TYPE"', async () => {
      await expect( () => TestProductModel.add( productWithWrongAttributeTypes ) )
        .rejects.toThrow( 'AT LEAST ONE FIELD IS OF A WRONG VALUE TYPE' )
    } )

    test( 'should throw "AT LEAST ONE REQUIRED FIELD MISSING"', async () => {
      const emptyProduct = {}

      //@ts-ignore
      await expect( () => TestProductModel.add( emptyProduct ) )
        .rejects.toThrow( 'AT LEAST ONE REQUIRED FIELD MISSING' )
    } )

    test( 'with duplicated object keys should resolve', async () => {
      //@ts-ignore
      const productWithRepeatedField: Object = {
        name: 'Orangen',
        description: null,
        show: true,
        //@ts-ignore
        show: false,
        eanCode: '',
        manufacturerId: 2000,
        //@ts-ignore
        manufacturerId: 5000,
        manufacturerProductId: null,
        bestPrice: null,
        bestPriceDealerId: null
      }

      //@ts-ignore
      const test = TestProductModel.add( productWithRepeatedField )

      expect( test ).resolves
    } )

    test( 'should throw "AT LEAST ONE NON-EXISTING FIELD"', async () => {
      const objectWithNonExistingFields = {
        serialNumber: '25',
        batchNumber: '001223'
      }

      //@ts-ignore
      await expect( () => TestProductModel.add( objectWithNonExistingFields ) )
        .rejects.toThrow( 'AT LEAST ONE NON-EXISTING FIELD' )
    } )

    test( 'should return product with an id of type number', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      expect( record.id ).not.toBeNaN()
    } )

    test( 'should return a value that is defined as id', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      expect( record.id ).toBeDefined()
    } )

    test( 'should create a product with an id greater than 0', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      expect( record.id ).toBeGreaterThan( 0 )
    } )

    test( 'should not return NULL', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect( test ).not.toBeNull()
    } )

    describe( 'all products should have different IDs', () => {
      test( 'product ids of both products added should be different (variant 1)', async () => {
        const test1 = await TestProductModel.add( testProd2 )
        const record1 = await test1.get()

        const test2 = await TestProductModel.add( testProd1 )
        const record2 = await test2.get()

        expect( record1.id !== record2.id ).toBeTruthy()
      } )

      test( 'product ids of both products added should be different (variant 2)', async () => {
        const test1 = await TestProductModel.add( testProd2 )
        const record1 = await test1.get()

        const test2 = await TestProductModel.add( testProd1 )
        const record2 = await test2.get()

        expect( record1.id === record2.id ).toBeFalsy()
      } )

      test( 'product ids of both products added should be different (variant 3)', async () => {
        const test1 = await TestProductModel.add( testProd2 )
        const test2 = await TestProductModel.add( testProd1 )

        expect( test1 ).not.toEqual( test2 )
      } )
    } )

    test( 'should return an ID', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect( test ).toHaveProperty( 'id' )
    } )

    test( 'Product added should have properties of Object Passed', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      const mKeys = Object.keys( testProd2 )

      mKeys.map( ( key ) => {
        expect( record ).toHaveProperty( key )
      } )

    } )

    test( 'add() should create a product with an id not less than 0', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      expect( record.id ).not.toBeLessThan( 1 )
    } )

    test( 'An instance should have same type as Object having same value of the key in the constructor', async () => {
      const instanceProduct = new TestProductModel( 100 )

      expect( instanceProduct ).toEqual( { id: 100 } )
    } )

    test( 'An instance should not have same type and structure as Object having same value of the key in the constructor', async () => {
      const instanceProduct = new TestProductModel( 100 )

      expect( instanceProduct ).not.toStrictEqual( { id: 100 } )
    } )

    test( 'add() should make use of constructor', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect.any( test )
    } )

    test( 'add() should return object containing id', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect( test ).toMatchObject( { id: expect.anything() } )
    } )

    test( 'add() should add just one product', async () => {
      await TestProductModel.add( testProd2 )

      const test = (await pg( 'products' )).map( snakeToCamelRecord )

      expect( test ).toHaveLength( 1 )
    } )

    test( 'add() should resolve to an object', async () => {
      const test = TestProductModel.add( testProd2 )

      await expect(test).resolves.toEqual({id: expect.anything()})
    } )

    test( 'add() should be defined', async () => {
      const test = TestProductModel.add( testProd2 )

      expect( test ).toBeDefined()
    } )

    test( 'add() should not return NULL', async () => {
      const test = await TestProductModel.add( testProd2 )

      expect( test ).not.toBeNull()
    } )
  } )

  describe( 'update()', () => {
    test( 'should change product name to "Schnitzel"', async () => {
      const testInstance = await TestProductModel.add( testProd2 )

      await testInstance.update( testProd3 )

      const updatedProduct = await testInstance.get()

      expect( updatedProduct.name ).toEqual( 'Schnitzel' )
    } )

    test( 'updating a nonexistent product should throw "PRODUCT CANNOT FOUND"', async () => {
      await TestProductModel.add( testProd2 )

      const product = new TestProductModel( 999 )

      await expect( () => product.update( testProd3 ) )
        .rejects.toThrow( 'PRODUCT CANNOT BE FOUND' )
    } )

    test( 'should throw "AT LEAST ONE FIELD IS OF WRONG VALUE TYPE"', async () => {
      const test = await TestProductModel.add( testProd2 )

      await expect( () => test.update( productWithWrongAttributeTypes ) )
        .rejects.toThrow( 'AT LEAST ONE FIELD IS OF WRONG VALUE TYPE' )
    } )

    // @TODO: test is always falsy
    test( 'should change product name to "Schuhe"', async () => {
      const updateName = {
        name: 'Schuhe'
      }

      const test = await TestProductModel.add( testProd2 )

      await test.update( updateName )

      const record = await test.get()

      expect( record.name !== 'Schuhe' ).toBeFalsy()
    } )

    // @TODO: fix it!
    test( 'updating with object containing ID field should not throw', async () => {
      const test = await TestProductModel.add( testProd2 )

      const updatedData = test.update( testProd1 )

      await expect(updatedData).resolves
    } )

    test( 'should return an object with the id', async () => {
      const test = await TestProductModel.add( testProd2 )
      const updatedData = await test.update( testProd3 )

      expect( updatedData )
        .toEqual( expect.objectContaining( { id: expect.anything() } ) )
    } )

    test( 'should not change the product ID', async () => {
      const test = await TestProductModel.add( testProd2 )

      const record = await test.get()

      const updatedData = await test.update( testProd3 )

      expect( record.id === updatedData.id ).toBeTruthy()
    } )

    // @TODO: Doesn't male any sense!
    test( 'should resolve to {"id": 1}', async () => {
      const test = await TestProductModel.add( testProd2 )

      const updateData = test.update( testProd3 )

      await expect(updateData).resolves.toEqual({"id": 1})
    } )

    test( 'updated product should have an id', async () => {
      const test = await TestProductModel.add( testProd2 )

      const updateData = await test.update( testProd3 )

      expect( updateData ).toHaveProperty( 'id' )
    } )

    test( 'updated product should have a name', async () => {
      const test = await TestProductModel.add( testProd2 )

      await test.update( testProd3 )

      const record = await test.get()

      expect( record ).toHaveProperty( 'name' )
    } )

    // @TODO: Fix this test!
    test( 'updated product should have properties matching argument for update function', async () => {
      const test = await TestProductModel.add( testProd2 )

      const updateNameAndShow = {
        name: 'Mineralwasser',
        show: false
      }

      await test.update( updateNameAndShow )

      const record = await test.get()

      expect( record.name ).toEqual(expect.stringContaining( updateNameAndShow.name ))
    } )

    // @TODO: Fix this test!
    test( 'should remove id attribute if there is any(truthy variant)', async () => {
      const test = await TestProductModel.add( testProd2 )

      await test.update( testProd1 )

      const record = await test.get()

      expect( record.id !== testProd1.id ).toBeTruthy()
    } )

    test( 'should remove id attribute if there is any(falsy variant)', async () => {
      const test = await TestProductModel.add( testProd2 )

      await test.update( testProd1 )

      const record = await test.get()

      expect( record.id === testProd1.id ).toBeFalsy()
    } )

    // @TODO: Fix this test!
    test( 'should throw "NO DATA HAS BEEN PASSED TO UPDATE PRODUCT"', async () => {
      const test = await TestProductModel.add( testProd2 )

      // @ts-ignore
      await expect(() => test.update( )).rejects.toThrow('NO DATA HAS BEEN PASSED TO UPDATE PRODUCT')
    } )
  } )

  describe( 'get()', () => {
    test( 'should get one product out of one', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( addedProduct.name ).toEqual( testProd2.name )
    } )

    // @TODO: Fix this test!
    test( 'should return an object', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( typeof addedProduct === 'object' ).toBeTruthy()
    } )

    // @TODO: Fix this test!
    test( 'should resolve to an object', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = test.get()

      await expect( addedProduct ).resolves.toEqual( expect.objectContaining( testProd2 ) )
    } )

    // @TODO: Fix this test!
    test( 'should should not return an array', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( Array.isArray( addedProduct ) ).toBeFalsy()
    } )

    test( 'should throw Error "PRODUCT NOT FOUND"', async () => {
      const test = new TestProductModel( 999 )

      await expect( () => test.get() ).rejects.toThrowError( 'PRODUCT NOT FOUND' )
    } )

    test( 'should return an object which is only different from add argument by the id attribute', async () => {
      const productAttributNames = Object.keys( testProd2 )

      const test = await TestProductModel.add( testProd2 )
      const productFromDatabase = await test.get()
      const productFromDatabaseAttributNames = Object.keys( productFromDatabase )

      const difference = productFromDatabaseAttributNames.filter( attrName => ! productAttributNames.includes( attrName ) )

      expect( difference ).toHaveLength( 1 )
      expect( difference[ 0 ] ).toEqual( 'id' )
    } )

    // @TODO: Fix this test!
    test( 'should not be null', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( addedProduct ).not.toBeNull()
    } )

    // @TODO: Fix this test!
    test( 'should not return undefined', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( addedProduct ).not.toBeUndefined()
    } )

    // @TODO: Use more meaningful var names!
    test( 'saved product should have one attribute more than the object passed to the add function', async () => {
      const test = await TestProductModel.add( testProd2 )

      const productRecord = await test.get()

      const productRecordKeysArray = Object.keys( productRecord )

      const testProdKeysArray = Object.keys( testProd2 )

      expect( productRecordKeysArray.length - testProdKeysArray.length ).toBe( 1 )
    } )

    // @TODO: Rename the test!
    test.only( 'should not change the value of any field', async () => {
      const test = await TestProductModel.add( testProd2 )

      const addedProduct = await test.get()

      expect( addedProduct.name ).toEqual( testProd2.name )
      expect( addedProduct.description ).toEqual( testProd2.description )
      expect( addedProduct.manufacturerId ).toEqual( testProd2.manufacturerId )
    } )
  } )

  describe( 'getAll()', () => {
    // @TODO: Implementation and test looks a bit weired!
    test( 'show return an empty array', async () => {
      const obj = new TestProductModel( 187492874293 )
      const allProducts = await obj.getAll()

      expect( allProducts ).toHaveLength( 0 )
    } )
  } )
} )
