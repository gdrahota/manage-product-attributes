import { pg } from '../../connect'
import { camelToSnakeRecord, snakeToCamelRecord } from '../../helper'

export interface IPage<T> {
  items: T[],
  numberOfItems: number,
  page: number,
  itemPerPage: number
}

export class GenericClass<T> {
  constructor( private name: string ) {
    if ( ! name ) {
      throw new Error( 'TABLE NAME MISSING' )
    }
  }

  async getAll(): Promise<T[]> {
    return pg( this.name )
      .select()
      .orderBy( 'id' )
  }

  async getById( id: number = 0 ): Promise<T | null> {
    const response = await pg( this.name ).where( 'id', id )

    if ( response.length > 0 ) {
      // @ts-ignore
      return snakeToCamelRecord( response[ 0 ] )
    }

    return null
  }

  async patch( id: number, obj: Record<any, any> ): Promise<any> {
    return pg( this.name )
      .where( 'id', id )
      .update( camelToSnakeRecord( obj ) )
  }

  async update( item: any ): Promise<T> {
    await pg( this.name ).where( 'id', item.id ).update( camelToSnakeRecord( item ), [ '*' ] )
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
