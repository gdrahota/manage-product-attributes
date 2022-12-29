import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from '@jest/globals'
import { getSetupAndTeardownForTables, start, stop } from '../../../tests/setup'

import productTableDef from '../../seeder/table-defs/products/def'
import { IProductTable } from '../../db/tables/products'
import { pg } from '../../db/connect'
import { snakeToCamelRecord } from '../../db/helper'

import { IEqualProduct, TestProductModel } from './index'

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
    bestPriceDealerId: null,
}

const testProd2: Omit<IProductTable, 'id'> = {
    name: 'Apfelgetränk',
    description: null,
    show: true,
    eanCode: '',
    manufacturerId: 2000,
    manufacturerProductId: null,
    bestPrice: null,
    bestPriceDealerId: null,
}

const testProd3: Object = {
    name: 'Schnitzel',
}

//@ts-ignore
const productWithoutName: IProductTable = {
    description: null,
    show: true,
    eanCode: '',
    manufacturerId: 2000,
    manufacturerProductId: null,
    bestPrice: null,
    bestPriceDealerId: null,
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
    bestPriceDealerId: null,
}

const productWithNonExistingAttributes: Object = {
    name: 'Non-existing attribute',
    description: '',
    availability: true,
    serialNo: '',
    manufacturerId: 2000,
    SupplierId: 3,
    worsePrice: 4000,
    bestPriceDealerId: 1,
}

beforeAll(start)

beforeEach(setupTables)

afterEach(tearDownTables)

afterAll(stop)


describe('data objects -> test products', () => {
    describe('add()', () => {
        test('should add a product', async () => {
            await TestProductModel.add(testProd2)

            const test = (await pg('products')).map(snakeToCamelRecord)
            expect(test).toHaveLength(1)
            expect(test[0].name).toEqual(testProd2.name)
        })

        test('should add a product with properties provided', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            expect(testProd2.name).toEqual(expect.stringMatching(record.name))
        })

        test('should return the new product', async () => {
            const test = await TestProductModel.add(testProd2)

            expect(test).toBeInstanceOf(TestProductModel)
            const record = await test.get()

            expect(record.id).toEqual(1)

            expect(record).toMatchObject(testProd2)
        })

        test('should remove ID field and replace it', async () => {
            const test = await TestProductModel.add(testProd1)

            const record = await test.get()

            expect(record.id).not.toEqual(testProd1.id)
        })

        test('should throw "AT LEAST ONE REQUIRED FIELD MISSING"', async () => {
            await expect(() => TestProductModel.add(productWithoutName))
                .rejects.toThrow('AT LEAST ONE REQUIRED FIELD MISSING')
        })

        test('should throw "AT LEAST ONE FIELD IS OF A WRONG VALUE TYPE"', async () => {
            await expect(() => TestProductModel.add(productWithWrongAttributeTypes))
                .rejects.toThrow('AT LEAST ONE FIELD IS OF A WRONG VALUE TYPE')
        })

        test('should throw "AT LEAST ONE REQUIRED FIELD MISSING"', async () => {
            const emptyProduct = {}

            //@ts-ignore
            await expect(() => TestProductModel.add(emptyProduct))
                .rejects.toThrow('AT LEAST ONE REQUIRED FIELD MISSING')
        })

        test('with duplicated object keys should resolve', async () => {
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
                bestPriceDealerId: null,
            }

            //@ts-ignore
            const test = TestProductModel.add(productWithRepeatedField)

            expect(test).resolves
        })

        test('should throw "AT LEAST ONE NON-EXISTING FIELD"', async () => {
            const objectWithNonExistingFields = {
                serialNumber: '25',
                batchNumber: '001223',
            }

            //@ts-ignore
            await expect(() => TestProductModel.add(objectWithNonExistingFields))
                .rejects.toThrow('AT LEAST ONE NON-EXISTING FIELD')
        })

        test('should return product with an id of type number', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            expect(record.id).not.toBeNaN()
        })

        test('should return a value that is defined as id', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            expect(record.id).toBeDefined()
        })

        test('should create a product with an id greater than 0', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            expect(record.id).toBeGreaterThan(0)
        })

        test('should not return NULL', async () => {
            const test = await TestProductModel.add(testProd2)

            expect(test).not.toBeNull()
        })

        describe('all products should have different IDs', () => {
            test('product ids of both products added should be different (variant 1)', async () => {
                const test1 = await TestProductModel.add(testProd2)
                const record1 = await test1.get()

                const test2 = await TestProductModel.add(testProd1)
                const record2 = await test2.get()

                expect(record1.id !== record2.id).toBeTruthy()
            })

            test('product ids of both products added should be different (variant 2)', async () => {
                const test1 = await TestProductModel.add(testProd2)
                const record1 = await test1.get()

                const test2 = await TestProductModel.add(testProd1)
                const record2 = await test2.get()

                expect(record1.id === record2.id).toBeFalsy()
            })

            test('product ids of both products added should be different (variant 3)', async () => {
                const test1 = await TestProductModel.add(testProd2)
                const test2 = await TestProductModel.add(testProd1)

                expect(test1).not.toEqual(test2)
            })
        })

        test('should return an ID', async () => {
            const test = await TestProductModel.add(testProd2)

            expect(test).toHaveProperty('id')
        })

        test('Product added should have properties of Object Passed', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            const mKeys = Object.keys(testProd2)

            mKeys.map((key) => {
                expect(record).toHaveProperty(key)
            })

        })

        test('add() should create a product with an id not less than 0', async () => {
            const test = await TestProductModel.add(testProd2)

            const record = await test.get()

            expect(record.id).not.toBeLessThan(1)
        })

        test('Newly created instance should hold the id as specified in the constructor\' first and only argument', async () => {
            const instanceProduct = new TestProductModel(100)

            expect(instanceProduct.id).toEqual(100)
        })

        test('An instance should not have same type and structure as Object having same value of the key in the constructor', async () => {
            const instanceProduct = new TestProductModel(100)

            expect(instanceProduct).not.toStrictEqual({id: 100})
        })

        test('add() should make use of constructor', async () => {
            const test = await TestProductModel.add(testProd2)

            expect.any(test)
        })

        test('add() should return object containing id', async () => {
            const test = await TestProductModel.add(testProd2)

            expect(test).toMatchObject({id: expect.anything()})
        })

        test('add() should add just one product', async () => {
            await TestProductModel.add(testProd2)

            const test = (await pg('products')).map(snakeToCamelRecord)

            expect(test).toHaveLength(1)
        })

        // @TODO: fix the test!
        test('should return to an object having an id', async () => {
            const addProductFn = await TestProductModel.add(testProd2)
            console.log(addProductFn)
            expect(Object.keys(addProductFn)).toEqual(['_id'])

        })

        test('add() should be defined', async () => {
            const test = TestProductModel.add(testProd2)

            expect(test).toBeDefined()
        })

        test('add() should not return NULL', async () => {
            const test = await TestProductModel.add(testProd2)

            expect(test).not.toBeNull()
        })
    })

    describe('update()', () => {
        test('should change product name to "Schnitzel"', async () => {
            const testInstance = await TestProductModel.add(testProd2)

            await testInstance.update(testProd3)

            const updatedProduct = await testInstance.get()

            expect(updatedProduct.name).toEqual('Schnitzel')
        })

        test('updating a nonexistent product should throw "PRODUCT CANNOT FOUND"', async () => {
            await TestProductModel.add(testProd2)

            const product = new TestProductModel(999)

            await expect(() => product.update(testProd3))
                .rejects.toThrow('PRODUCT CANNOT BE FOUND')
        })

        test('should throw "AT LEAST ONE FIELD IS OF WRONG VALUE TYPE"', async () => {
                const test = await TestProductModel.add(testProd2)

                await expect(
                    () => test.update(productWithWrongAttributeTypes)).rejects.toThrow('AT LEAST ONE FIELD IS OF WRONG VALUE TYPE')
            },
        )

        test('should change product name, new name should not be the old value', async () => {
            const updateObj = {
                name: 'Schuhe',
            }

            const test = await TestProductModel.add(testProd2)

            await test.update(updateObj)

            const record = await test.get()

            expect(testProd2.name === updateObj.name).toBeFalsy()
            expect(testProd2.name !== updateObj.name).toBeTruthy()
        })

        test('updating with object containing ID field should resolve', async () => {
            const test = await TestProductModel.add(testProd2)

            const updatedDataFn = test.update(testProd1)

            await expect(updatedDataFn).resolves.toEqual({'id': 1})
        })

        test('should return an object with the id', async () => {
            const test = await TestProductModel.add(testProd2)
            const updatedData = await test.update(testProd3)

            expect(updatedData)
                .toEqual(expect.objectContaining({id: expect.anything()}))
        })

        test('should not change the product id', async () => {
            const secondTestProductObj = await TestProductModel.add(testProd2)
            const secondTestProductRecord = await secondTestProductObj.get()

            const changedSecondTestProductObj = await secondTestProductObj.update(testProd3)

            expect(secondTestProductRecord.id === changedSecondTestProductObj.id).toBeTruthy()
        })

        test('should resolve to {"id": 1}', async () => {
            const test = await TestProductModel.add(testProd2)

            const updateData = test.update(testProd3)

            await expect(updateData).resolves.toEqual({'id': 1})
        })

        test('updated product should have an id', async () => {
            const test = await TestProductModel.add(testProd2)

            const updateData = await test.update(testProd3)

            expect(updateData).toHaveProperty('id')
        })

        test('updated product should have a name', async () => {
            const test = await TestProductModel.add(testProd2)

            await test.update(testProd3)

            const record = await test.get()

            expect(record).toHaveProperty('name')
        })

        test('updated product should have properties matching argument for update function', async () => {
            const testProductObj = await TestProductModel.add(testProd2)

            const updateNameAndShow = {
                name: 'Mineralwasser',
                show: false,
            }

            await testProductObj.update(updateNameAndShow)
            const record = await testProductObj.get()

            // @TODO: Fix this line to match the test's name!
            expect(record.name).toEqual(expect.stringContaining(updateNameAndShow.name))
        })

        test('by an obj having an id should not change to the new id ', async () => {
            const testProductObj = await TestProductModel.add(testProd2)

            await testProductObj.update({
                ...testProd2,
                id: 987,
            })

            const record = await testProductObj.get()

            expect(record.id).toEqual(testProductObj.id)
        })

        test('should throw "NO DATA HAS BEEN PASSED TO UPDATE PRODUCT"', async () => {
            const test = await TestProductModel.add(testProd2)

            // @ts-ignore
            await expect(() => test.update()).rejects.toThrow('NO DATA HAS BEEN PASSED TO UPDATE PRODUCT')
        })

        test('should throw "NO DATA HAS BEEN PASSED TO UPDATE PRODUCT"', async () => {
            const test = await TestProductModel.add(testProd2)

            // @ts-ignore
            await expect(() => test.update(null)).rejects.toThrow('NO DATA HAS BEEN PASSED TO UPDATE PRODUCT')
        })

        test('should throw "NO DATA HAS BEEN PASSED TO UPDATE PRODUCT"', async () => {
            const test = await TestProductModel.add(testProd2)

            await expect(() => test.update({})).rejects.toThrow('NO DATA HAS BEEN PASSED TO UPDATE PRODUCT')
        })
    })

    describe('get()', () => {
        test('should get one product out of one', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(addedProduct.name).toEqual(testProd2.name)
        })

        test('should return an object', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(typeof addedProduct === 'object').toBeTruthy()
        })

        test('should resolve to an object', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = test.get()

            await expect(addedProduct).resolves.toEqual(expect.objectContaining(testProd2))
        })

        test('should should not return an array', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(Array.isArray(addedProduct)).toBeFalsy()
        })

        test('should throw Error "PRODUCT NOT FOUND"', async () => {
            const test = new TestProductModel(999)

            await expect(() => test.get()).rejects.toThrowError('PRODUCT NOT FOUND')
        })

        test('should return an object which is only different from the add() argument by the attribute id', async () => {
            const productAttributeNames = Object.keys(testProd2)

            const test = await TestProductModel.add(testProd2)
            const productFromDatabase = await test.get()
            const productFromDatabaseAttributNames = Object.keys(productFromDatabase)

            const difference = productFromDatabaseAttributNames.filter(attrName => !productAttributeNames.includes(attrName))

            expect(difference).toHaveLength(1)
            expect(difference[0]).toEqual('id')
        })

        test('should not return null', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(addedProduct).not.toBeNull()
        })

        test('should not return undefined', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(addedProduct).not.toBeUndefined()
        })

        // @TODO: Use more meaningful var names!
        test('saved product should have one attribute more than the object passed to the add() function', async () => {
            const test = await TestProductModel.add(testProd2)

            const productRecord = await test.get()
            const productRecordKeyArray = Object.keys(productRecord)

            const testProdKeyArray = Object.keys(testProd2)

            expect(productRecordKeyArray.length - testProdKeyArray.length).toBe(1)
        })

        // @TODO: test doesn't cover all attributes
        test('should not change the value of any attr', async () => {
            const test = await TestProductModel.add(testProd2)

            const addedProduct = await test.get()

            expect(addedProduct.name).toEqual(testProd2.name)
            expect(addedProduct.description).toEqual(testProd2.description)
            expect(addedProduct.manufacturerId).toEqual(testProd2.manufacturerId)
        })
    })

    describe('delete()', () => {
        test.only('Should throw "PRODUCT DOES NOT EXIST"',async () => {
            const productInstance = new TestProductModel( 999 )

            await expect(() => productInstance.delete()).rejects.toThrow('PRODUCT DOES NOT EXIST')
        })

        test.only('Should have no record in database after delete', async () => {
            const testProduct = await TestProductModel.add( testProd2 )

            const testProductRecord = testProduct.get()

            await testProduct.delete()

            const test = (await pg('products')).map( snakeToCamelRecord )

            expect( test ).toHaveLength( 0 )
        })
    })

    describe('isEqual()', () => {
        const productRecord: Omit<IProductTable, 'id'> = {
            name: 'name-1',
            show: false,
            manufacturerId: 1234,
            eanCode: null,
            bestPriceDealerId: null,
            bestPrice: null,
            manufacturerProductId: 'ABC',
            description: null,
        }


        let testProduct2Obj: TestProductModel

        beforeEach(async () => {
            testProduct2Obj = await TestProductModel.add(productRecord)
        })

        test('comparing two products having the same values for name, manufacturer ID and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-1',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })

        test('comparing two products having same values for name and manufacturer ID but different manufacturer product ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-1',
                manufacturerId: 1234,
                manufacturerProductId: 'ABCD',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(false)
        })

        test('comparing two products having same values for name and manufacturer product ID but different manufacturer ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-1',
                manufacturerId: 12345,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(false)
        })

        test('comparing two products having the same manufacturer and manufacturer product ID but different values for name should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-2',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toEqual(false)
        })

        test('comparing two products having the same manufacturer product ID but having different values for name and manufacturer ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'different-name',
                manufacturerId: 99999,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeFalsy()
        })

        test('comparing name attrs "name-1" and "name-2" of products having same manufacturer ID but different manufacturer product ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-2',
                manufacturerId: 1234,
                manufacturerProductId: 'ABCD',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeFalsy()
        })

        test('comparing name attrs "name-1" and "name-2" of products having different manufacturer and manufacturer product ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-2',
                manufacturerId: 12345,
                manufacturerProductId: 'ABCD',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeFalsy()
        })

        test('comparing name attrs "name-1" and "name - 1" of products with same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name - 1',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeTruthy()
        })

        test('comparing two identical products, one having additional white spaces in the name attribute value should return true', async () => {
            const productRecord2: IEqualProduct = {
                ...productRecord,
                name: 'name - 1',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })


        test('Comparing two identical products, one having uppercase characters in name attribute value should return true', async () => {
            const productRecord2: IEqualProduct = {
                ...productRecord,
                name: 'NaMe-1'
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })

        test('comparing two identical products, one including a special character in its name attribute value should return true', async () => {
            const productRecord2: IEqualProduct = {
                ...productRecord,
                name: 'Name-+%=!#1.',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })

        test('comparing products with name attrs "name-1." and "name-1" having same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name-1.',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })

        //duplicate
        test('comparing name attrs "name-1" and "  NamE   - 1    " of products with same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: '  NamE   - 1    ',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeTruthy()
        })

        //duplicate
        test('comparing name attrs "name-1" and "NAME1" of products with same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'NAME1',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeTruthy()
        })

        //duplicate
        test('Comparing two identical products, except for one having additional leading zeros in the name attribute value should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'NAME0000001',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeTruthy()
        })

        test('comparing name attrs "name-1" and "NAME.0000001" of products with same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'NAME.0000001',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBeTruthy()
        })

        test('comparing name attrs "name-1" and "  NamE   - 1    " of products with same manufacturer ID but different manufacturer product ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: '  NamE   - 1    ',
                manufacturerId: 1234,
                manufacturerProductId: 'ABCD',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(false)
        })

        test('comparing name attrs "name-1" and "  NamE   - 1    " of products with different manufacturer ID but same manufacturer product ID should return false', async () => {
            const productRecord2: IEqualProduct = {
                name: '  NamE   - 1    ',
                manufacturerId: 12345,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(false)
        })

        test('comparing products with name attrs "name--------1" and "name-1" having same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: 'name--------1',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })


        test('comparing products with name attrs "   name 00001 " and "name-1" having same manufacturer and manufacturer product ID should return true', async () => {
            const productRecord2: IEqualProduct = {
                name: '   name 00001 ',
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            expect(comparisonStatus).toBe(true)
        })


        test('comparing two products with the second product missing the name attribute should throw "PRODUCT NAME ATTRIBUTE DOES NOT EXIST"', async () => {
            //@ts-ignore
            const productRecord2: IEqualProduct = {
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            await expect(() => testProduct2Obj.isEqual(productRecord2)).rejects.toThrow("PRODUCT NAME ATTRIBUTE DOES NOT EXIST")
        })

        test('comparing two products with second product not having a name value NULL should throw "PRODUCT DOES NOT HAVE A NAME"', async () => {
            const productRecord2: IEqualProduct = {
                //@ts-ignore
                name: null,
                manufacturerId: 1234,
                manufacturerProductId: 'ABC',
            }

            await expect(() => testProduct2Obj.isEqual(productRecord2)).rejects.toThrow("PRODUCT DOES NOT HAVE A NAME")
        })

        test('comparing a product with another product not having a manufacturer ID attribute should throw "MANUFACTURER ID ATTRIBUTE DOES NOT EXIST"', async () => {
            //@ts-ignore
            const productRecord2: IEqualProduct = {
                name: 'name-1',
                manufacturerProductId: 'ABC',
            }

            await expect(() => testProduct2Obj.isEqual(productRecord2)).rejects.toThrow("MANUFACTURER ID ATTRIBUTE DOES NOT EXIST")
        })

        test('comparing a product with another product not having a manufacturer ID attribute should throw "MANUFACTURER PRODUCT ID ATTRIBUTE DOES NOT EXIST"', async () => {
            //@ts-ignore
            const productRecord2: IEqualProduct = {
                name: 'name-1',
                manufacturerId: 1234,
            }

            await expect(() => testProduct2Obj.isEqual(productRecord2)).rejects.toThrow("MANUFACTURER PRODUCT ID ATTRIBUTE DOES NOT EXIST")
        })

        test('Passing an argument of type other than an object should throw "INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT"(Bool Type)', async () => {

            const product2 = true

            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual(product2)).rejects.toThrow("INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT")
        })

        test('Passing an argument of type other than an object should throw "INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT"(String Type)', async () => {

            const product2 = 'Name-1'

            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual(product2)).rejects.toThrow("INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT")
        })

        test('Passing an argument of type other than an object should throw "INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT"(Int Type)', async () => {

            const product2 = 1000

            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual(product2)).rejects.toThrow("INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT")
        })

        test('Passing an argument of type other than an object should throw "INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT"(Array Type)', async () => {

            const product2 = ['name-1', '1234', 'ABCD']

            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual(product2)).rejects.toThrow("INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT")
        })

        test('Not passing an argument to isEqual function should throw "NO PRODUCT HAS BEEN PASSED TO COMPARE WITH"', async () => {
            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual()).rejects.toThrow("NO PRODUCT HAS BEEN PASSED TO COMPARE WITH")
        })

        test('Passing NULL to isEqual function should throw "NO PRODUCT HAS BEEN PASSED TO COMPARE WITH"', async () => {
            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual(null)).rejects.toThrow("NO PRODUCT HAS BEEN PASSED TO COMPARE WITH")
        })

        test('Passing an EMPTY object to isEqual function should throw "INVALID OBJECT. AN EMPTY PRODUCT OBJECT CANNOT BE COMPARED"', async () => {
            //@ts-ignore
            await expect(() => testProduct2Obj.isEqual({})).rejects.toThrow("INVALID OBJECT. AN EMPTY PRODUCT OBJECT CANNOT BE COMPARED")
        })


        //Redundant
        test('isEqual method should return a Boolean', async () => {
            const productRecord2: IEqualProduct = {
                //@ts-ignore
                name: 'name-1',
                manufacturerId: 12346,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            await expect(typeof comparisonStatus === 'boolean').toBe(true)
        })

        //Redundant
        test('isEqual should not return any type apart from a Boolean', async () => {
            const productRecord2: IEqualProduct = {
                //@ts-ignore
                name: 'name-1',
                manufacturerId: 12346,
                manufacturerProductId: 'ABC',
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            await expect(typeof comparisonStatus !== 'boolean').toBeFalsy()
        })


        test('Comparing two identical products, one having additional properties should  return true', async () => {
            const productRecord2 = {
                ...productRecord,
                status: 'new',
                deleted: 'false'
            }

            const comparisonStatus = await testProduct2Obj.isEqual(productRecord2)

            await expect(comparisonStatus).toEqual(true)
        })


        test('isEqual method being used on a product that does not exist should throw "PRODUCT NOT FOUND"', async () => {
            const nonExistentProduct = new TestProductModel( 999 )

            await expect( () => nonExistentProduct.isEqual( productRecord ) ).rejects.toThrow('PRODUCT NOT FOUND')
        })

    })

    describe('getAll()', () => {
        // @TODO: Implementation and test looks a bit weired!
        test('show return an empty array', async () => {
          const allProducts = await TestProductModel.getAll()

            expect(allProducts).toHaveLength(0)
        })
    })
})
