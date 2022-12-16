import { pg } from '../../db/connect'
import { camelToSnakeRecord, snakeToCamelRecord } from '../../db/helper'
import { IProductTable } from '../../db/tables/products'
import {type} from "os";
import {isArray} from "util";

export type IEqualProduct = Pick<IProductTable, 'name' | 'manufacturerId' | 'manufacturerProductId'>

export class TestProductModel {
  private static readonly tableName = 'products'

  constructor( private readonly _id: number ) {
    if ( ! _id ) {
      throw new Error( 'PRODUCT_ID IS MISSING' )
    }
  }

  get id() {
    return this._id
  }

  static async add( product: Omit<IProductTable, 'id'> ): Promise<TestProductModel> {
    //@ts-ignore
    delete product.id

    try {
      const data = await pg( this.tableName ).insert( camelToSnakeRecord( product ), [ 'id' ] )

      const FIRST_RECORD_INDEX = 0

      return new TestProductModel( data[ FIRST_RECORD_INDEX ].id )

    } catch ( error: any ) {
      if ( error.code == '23502' ) {
        throw new Error( 'AT LEAST ONE REQUIRED FIELD MISSING' )
      }

      if ( error.code == '22P02' ) {
        throw new Error( 'AT LEAST ONE FIELD IS OF A WRONG VALUE TYPE' )
      }

      if ( error.code == '42703' ) {
        throw new Error( 'AT LEAST ONE NON-EXISTING FIELD' )
      }

      throw error
    }
  }

  async update( data: Partial<IProductTable> ): Promise<IProductTable> {
    if ( ! data ) {
      throw new Error( 'NO DATA HAS BEEN PASSED TO UPDATE PRODUCT' )
    }

    try {

      //@ts-ignore
      delete data.id
      const record = await pg.from( TestProductModel.tableName ).where( 'id', this._id )

      if( Object.keys(data).length === 0){
        throw new Error( 'NO DATA HAS BEEN PASSED TO UPDATE PRODUCT' )
      }

      if ( record.length === 0 ) {
        throw new Error( 'PRODUCT CANNOT BE FOUND' )
      }

      const updatedData = await pg( TestProductModel.tableName )
        .where( 'id', this._id )
        .update( camelToSnakeRecord( data ), [ 'id' ] )

      const FIRST_RECORD_INDEX = 0

      return snakeToCamelRecord( updatedData[ FIRST_RECORD_INDEX ] ) as IProductTable

    } catch ( error: any ) {
      console.log(error.code)
      if ( error.code == '42P01' ) {
        throw new Error( 'AT LEAST ONE FIELD IS OF WRONG VALUE TYPE' )
      }

      if ( error.code === '22P02' ) {
        throw new Error( 'AT LEAST ONE FIELD IS OF WRONG VALUE TYPE' )
      }

      throw error
    }
  }

  async get(): Promise<IProductTable> {
    try {
      const insertedRecords = await pg.from( TestProductModel.tableName ).where( 'id', this._id )

      if ( insertedRecords.length === 0 ) {
        throw new Error( 'PRODUCT NOT FOUND' )
      }

      const FIRST_RECORD_INDEX = 0
      return snakeToCamelRecord( insertedRecords[ FIRST_RECORD_INDEX ] ) as IProductTable

    } catch ( error: any ) {
      throw error
    }
  }

  async getAll(): Promise<[ IProductTable ]> {
    const insertedRecords = await pg.from( TestProductModel.tableName )

    return insertedRecords as [ IProductTable ]
  }

  async isEqual( otherProduct: IEqualProduct ): Promise<boolean> {
    if(!otherProduct){
      throw new Error("NO PRODUCT HAS BEEN PASSED TO COMPARE WITH")
    }
    else{
      if( typeof otherProduct === 'object' && !Array.isArray(otherProduct)){
        console.log('It is an object')
        if (Object.keys(otherProduct).length == 0) {
          throw new Error("INVALID OBJECT. AN EMPTY PRODUCT OBJECT CANNOT BE COMPARED")
        } else {
          if (otherProduct.name === undefined) {
            throw new Error("PRODUCT NAME ATTRIBUTE DOES NOT EXIST")
          }

          if (otherProduct.name === null) {
            throw new Error("PRODUCT DOES NOT HAVE A NAME")
          }

          if (otherProduct.manufacturerId === undefined) {
            throw new Error("MANUFACTURER ID ATTRIBUTE DOES NOT EXIST")
          }

          if (otherProduct.manufacturerId === null) {
            throw new Error("MANUFACTURER ID ATTRIBUTE DOES NOT EXIST")
          }

          if (otherProduct.manufacturerProductId === undefined) {
            throw new Error("MANUFACTURER PRODUCT ID ATTRIBUTE DOES NOT EXIST")
          }

        }
      }
      else{
        throw new Error("INVALID PRODUCT TYPE. PRODUCT SHOULD BE AN OBJECT")
      }
    }
    try {
      const productRecord = await this.get()

      if (productRecord.manufacturerId === otherProduct.manufacturerId && productRecord.manufacturerProductId === otherProduct.manufacturerProductId) {
        return getNumbersFromString(stringCleaner(productRecord.name).toLowerCase()) == getNumbersFromString(stringCleaner(otherProduct.name).toLowerCase())
      }
      return false
    }

    catch (error: any) {
      throw error
    }
  }
}

function stringCleaner(str: String) {
  return str.replace(/([^a-zA-Z0-9]+)/g, s0 => '')
}

const getNumbersFromString = (str: String) => {
  const matches =  str.match(/(\d+)/)
  //@ts-ignore
  if(matches){
    return parseInt(matches[0])
  }
}
