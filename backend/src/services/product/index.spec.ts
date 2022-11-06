import { ProductService } from './index'
import { dropAllTables, start, stop } from '../../../tests/setup'
import { ensureDefaultTables } from '../../seeder'

const productService = new ProductService()

beforeAll( async () => {
  await start()
} )

beforeEach( async () => {
  await ensureDefaultTables()
} )

afterEach( async () => {
  await dropAllTables()
} )

afterAll( async () => {
  await stop()
} )

describe( 'services -> ProductService ->', () => {
  describe( 'getAll()', () => {
    test( 'should return an array of 0 elements', async () => {
      const test = await productService.getAll()

      expect( test ).toHaveLength( 0 )
    } )
  } )

  describe( 'getById()', () => {
    test( 'should throw an error if null is being provided', async () => {
      await expect( async () => {
        // @ts-ignore
        await productService.getById( null )
      } ).rejects.toThrow( 'NO PRODUCT WITH ID "null"' )
    } )
  } )
} )
