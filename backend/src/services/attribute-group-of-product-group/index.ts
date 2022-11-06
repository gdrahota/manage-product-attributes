import { camelToSnakeRecord } from '../../db/helper'
import { AttributeGroupOfProductGroupTable, IAttributeGroupOfProductGroupTable } from '../../db/tables/attribute_groups_of_product_groups'
import { pg } from '../../db/connect'
import Bluebird from 'bluebird'
import {
  AttributeOfAttributeGroupOfProductGroupTable,
  IAttributeOfAttributeGroupOfProductGroupTable
} from '../../db/tables/attributes-of-attribute-groups-of-product-groups'

export interface IAttributeGroupOfProductGroup {
  id: number
  productGroupId: number
  position: number
  name: string
  description: string | null
  attributes: any[]
}

interface updateParam {
  productGroupId: number
  items: IAttributeGroupOfProductGroup[]
}

export class AttributeGroupOfProductGroup {
  private attributeGroupOfProductGroupTable = new AttributeGroupOfProductGroupTable<IAttributeGroupOfProductGroupTable>()
  private attributeOfAttributeGroupOfProductGroupTable = new AttributeOfAttributeGroupOfProductGroupTable<IAttributeOfAttributeGroupOfProductGroupTable>()

  async getById( id: number ): Promise<IAttributeGroupOfProductGroup | null> {
    const item = await this.attributeGroupOfProductGroupTable.getById( id )

    if ( ! item ) {
      throw Error( `NO AttributeGroupOfProductGroupTable WITH ID "${ id }"` )
    }

    const attributes = await this.attributeOfAttributeGroupOfProductGroupTable.getByAttributeGroupOfProductGroupId( id )

    return {
      ...item,
      attributes
    }
  }

  async getAll(): Promise<IAttributeGroupOfProductGroup[]> {
    const groups: IAttributeGroupOfProductGroupTable[] = await this.attributeGroupOfProductGroupTable.getAll()

    return Bluebird.mapSeries( groups, ( { id } ) => {
      return this.getById( id ) as unknown as IAttributeGroupOfProductGroup
    } )
  }

  async update( { productGroupId, items }: updateParam ): Promise<IAttributeGroupOfProductGroup[]> {
    const returnIds: number[] = []

    await Bluebird.each( items, async item => {
      const { id, name, position, description, attributes } = item

      if ( id ) {
        await this.attributeGroupOfProductGroupTable.update( camelToSnakeRecord( { id, productGroupId, position, name, description } ) )
        returnIds.push( id )
        await this.updateAttrs( id, item.attributes )
      } else {
        const newRecord = await this.attributeGroupOfProductGroupTable.add( camelToSnakeRecord( {
          productGroupId,
          position,
          name,
          description
        } ) )
        returnIds.push( newRecord.id )
        await this.updateAttrs( newRecord.id, item.attributes )
      }
    } )

    return this.getByProductGroupId( productGroupId )
  }

  async add( item: Omit<IAttributeGroupOfProductGroup, 'id'> ): Promise<IAttributeGroupOfProductGroup | null> {
    const newItem = await this.attributeGroupOfProductGroupTable.add( camelToSnakeRecord( item ) )
    return this.getById( newItem.id )
  }

  private async getByProductGroupId( id: number ): Promise<IAttributeGroupOfProductGroup[]> {
    const ids = await pg.queryBuilder()
      .select( 'id' )
      .from( 'attribute_groups_of_product_groups' )
      .where( 'product_group_id', id )

    return Bluebird.mapSeries( ids, ( { id } ) => {
      return this.getById( id ) as unknown as IAttributeGroupOfProductGroup
    } )
  }

  private async updateAttrs( parentId: number, attributes: any[] ) {
    const old = await this.attributeOfAttributeGroupOfProductGroupTable.getByAttributeGroupOfProductGroupId( parentId )

    const currentIds: number[] = old.map( ( { id } ) => id )
    const providedIds = attributes.map( ( { id } ) => id ).filter( i => !! i )

    const idsToDelete = currentIds.filter( id => ! providedIds.includes( id ) )
    const attributesToAdd = attributes.filter( ( { id } ) => ! id )

    await Bluebird.each( idsToDelete, id => {
        return this.attributeOfAttributeGroupOfProductGroupTable.delete( id )
      }
    )

    await Bluebird.each( attributesToAdd, attribute => {
        return this.attributeOfAttributeGroupOfProductGroupTable.add( camelToSnakeRecord( {
          attributeGroupOfProductGroupId: parentId,
          attrId: attribute.attrId,
          position: attribute.position,
        } ) )
      }
    )

    const toBeUpdated = attributes.filter( ( { id } ) => id )
    await Bluebird.each( toBeUpdated, attribute => {
      return this.attributeOfAttributeGroupOfProductGroupTable.update( camelToSnakeRecord( attribute ) )
    } )
  }
}
