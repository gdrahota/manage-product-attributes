import { pg } from "../../connect"
import { snakeToCamelRecord } from "../../helper"

export class GenericClass<T> {
  constructor( private name: string ) {
    if ( ! name ) {
      throw new Error( 'TABLE NAME MISSING' )
    }
  }

  async getAll(): Promise<T[]> {
    const records = await pg( this.name ).select()
    return records.map( snakeToCamelRecord ) as T[]
  }

  async getById( id: number = 0 ): Promise<T | null> {
    const response = await pg( this.name )
      .where( 'id', id )
      .select()

    if ( response.length > 0 ) {
      // @ts-ignore
      return snakeToCamelRecord( response[0] )
    }

    return null
  }

  async update( p: any ): Promise<T> {
    return pg( this.name ).where( 'id', p.id ).update( p, [ '*' ] ) as Promise<unknown> as Promise<T>
  }

  async add( p: any ): Promise<T> {
    const [ newId ] = await pg( this.name ).insert( p, [ 'id' ] )
    return this.getById( newId.id ) as Promise<T>
  }

  delete( id: number ) {
    return pg( this.name )
      .where( 'id', id )
      .del()
  }
}
