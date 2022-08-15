import { pg } from "../../connect"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"

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

  async update( item: any ): Promise<T> {
    await pg( this.name ).where( 'id', item.id ).update( item, [ '*' ] )
    const response = await this.getById( item.id )

    if ( ! response ) {
      throw Error( `NO INSTANCE WITH ID "${ item.id }" FOUND` )
    }

    return snakeToCamelRecord( response ) as Promise<unknown> as Promise<T>
  }

  async add( item: any ): Promise<T> {
    const [ newId ] = await pg( this.name ).insert( camelToSnakeRecord( item ), [ 'id' ] )
    return this.getById( newId.id ) as Promise<T>
  }

  delete( id: number ) {
    return pg( this.name )
      .where( 'id', id )
      .del()
  }
}
