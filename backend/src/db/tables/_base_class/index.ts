import { pg } from "../../connect"

export class GenericClass<T> {
  constructor( private name: string ) {
    if ( ! name ) {
      throw new Error( 'TABLE NAME MISSING' )
    }
  }

  async getAll() {
    return pg( this.name ).select()
  }

  async getById( id: number = 0 ): Promise<T> {
    const response = await pg( this.name )
      .where( 'id', id )
      .select()

    return response.length > 0
      ? response[0]
      : null
  }

  async update( p: any ): Promise<T> {
    return pg( this.name ).where( 'id', p.id ).update( p, [ '*' ] ) as Promise<unknown> as Promise<T>
  }

  async add( p: any ): Promise<T> {
    return pg( this.name ).insert( p, [ '*' ] ) as Promise<unknown> as Promise<T>
  }

  delete( id: number ) {
    return pg( this.name )
      .where( 'id', id )
      .del()
  }
}
