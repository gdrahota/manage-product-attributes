import { ProductService } from './index'
import { dropAllTables, start, stop } from '../../../tests/setup'
import { ensureDefaultTables } from '../../seeder'

const productService = new ProductService()

beforeAll( async () => {
  await start()
  console.log( '=> beforeAll' )
} )

beforeEach( async () => {
  await ensureDefaultTables()
  console.log( '=> beforeEach' )
} )

afterEach( async () => {
  await dropAllTables()
  console.log( '=> afterEach' )
} )

afterAll( async () => {
  await stop()
  console.log( '=> afterAll' )
} )

describe( 'services -> ProductService ->', () => {
  describe( 'getById()', () => {
    test( 'should throw an error if null is being provided', async () => {
      await expect( async () => {
        await productService.getById( 99 )
      } ).rejects.toThrow( 'NO PRODUCT WITH ID "99"' )
    } )
  } )
} )
