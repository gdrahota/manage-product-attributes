import { IManufacturerTable, ManufacturerTable } from "../../db/tables/manufacturers"
import { ProductGroupTable } from "../../db/tables/product-groups"
import { ProductTable } from "../../db/tables/products"
import { ProductToProductGroupTable } from "../../db/tables/product-to_product-groups"
import { IProductGroup } from "../product-group"
import { Promise as BluebirdPromise } from 'bluebird'
import { IProductToAttributeValueTable, ProductToAttributeValueTable } from "../../db/tables/product-attribute-to-values"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import { IProductAttributeValueTable, ProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { camelToSnakeRecord } from "../../db/helper"

export interface IAttributeValue {
  id: number
  attrId: number
  value: number | string | boolean | null
}

export interface IProduct {
  id: number
  name: string
  manufacturer: IManufacturerTable
  productGroups: IProductGroup[]
  eanCode: string | null
  manufacturerProductId: string | null
  attributeValue: IAttributeValue[]
}

export class Product {
  private productTable = new ProductTable()
  private productToProductGroupTable = new ProductToProductGroupTable()
  private productGroupTable = new ProductGroupTable()
  private manufacturerTable = new ManufacturerTable()
  private productToAttributeValueTable = new ProductToAttributeValueTable()
  private productAttributeTable = new ProductAttributeTable()
  private productAttributeValueTable = new ProductAttributeValueTable<IProductAttributeValueTable>()

  async getById( id: number ): Promise<IProduct> {
    const baseData = await this.productTable.getById( id )

    if ( ! baseData ) {
      throw Error( `NO PRODUCT WITH ID "${ id }"` )
    }

    const manufacturerData = await this.manufacturerTable.getById( baseData.manufacturerId )

    if ( ! manufacturerData ) {
      throw Error( `NO MANUFACTURER WITH ID "${ baseData.manufacturerId }"` )
    }

    const productToProductGroups = await this.productToProductGroupTable.getByProductId( id )
    const productGroups = await BluebirdPromise.mapSeries( productToProductGroups, productToProductGroup => {
      return this.productGroupTable.getById( productToProductGroup.productGroupId )
    } ) as unknown as IProductGroup[]

    const productToAttributeRawValues = await this.productToAttributeValueTable.getByProductId( id ) as IProductToAttributeValueTable[]

    const attributeValue = await BluebirdPromise.map( productToAttributeRawValues, async ( attributeRawValue: IProductToAttributeValueTable ) => {
      const attrValue = await this.productAttributeValueTable.getById( attributeRawValue.productAttributeValueId ) as unknown as IProductAttributeValueTable

      if ( ! attrValue ) {
        return
      }

      const attribute = (await this.productAttributeTable.getById( attrValue.attrId )) as IProductAttributeTable

      if ( ! attribute || ! attrValue ) {
        return null
      }

      let value: IAttributeValue = {
        id: attrValue.id,
        attrId: attrValue.attrId,
        value: null
      }

      switch ( attribute.type ) {
        case 'decimal':
          value.value = attrValue.decimalValue
          break
        case 'text':
          value.value = attrValue.textValue
          break
        case 'boolean':
          value.value = attrValue.boolValue
          break
        default:
      }

      return value

    } ).filter( i => !! i ) as unknown as IAttributeValue[]

    return {
      id: baseData.id,
      name: baseData.name,
      manufacturer: manufacturerData,
      productGroups,
      eanCode: baseData.eanCode,
      manufacturerProductId: baseData.manufacturerProductId,
      attributeValue
    }
  }

  async getAll(): Promise<IProduct[]> {
    const allProducts = this.productTable.getAll()

    return BluebirdPromise.mapSeries( allProducts, ( { id } ) => {
      return this.getById( id )
    } )
  }

  async saveChanges( productId: number, product: IProduct ) {
    const old = await this.getById( product.id )

    if ( ! old ) {
      throw Error( `NO PRODUCT WITH ID "${ productId }"` )
    }

    const changedProductTableAttrs: any = {}

    // check product name
    if ( old.name !== product.name ) {
      changedProductTableAttrs.name = product.name
    }

    // check manufacturer
    if ( old.manufacturer.id !== product.manufacturer.id ) {
      changedProductTableAttrs.manufacturerId = product.manufacturer.id
    }

    // check eanCode
    if ( old.eanCode !== product.eanCode ) {
      changedProductTableAttrs.eanCode = product.eanCode
    }

    // check manufacturerProductId
    if ( old.manufacturerProductId !== product.manufacturerProductId ) {
      changedProductTableAttrs.manufacturerProductId = product.manufacturerProductId
    }

    if ( Object.keys( changedProductTableAttrs ).length > 0 ) {
      await this.productTable.patch( productId, changedProductTableAttrs )
    }

    const mapId = ( i: any ) => i.id

    // check product groups
    const oldProductGroups = old.productGroups.map( mapId )
    const newProductGroups = product.productGroups.map( mapId )

    const pgsToBeDeleted = oldProductGroups.filter( oId => ! newProductGroups.includes( oId ) )
    const pgsToBeAdded = newProductGroups.filter( ( nId: number ) => ! oldProductGroups.includes( nId ) )

    await BluebirdPromise.each( pgsToBeDeleted, pgToBeDeleted => {
      return this.productToProductGroupTable.deleteByProductIdAndProductGroupId( productId, pgToBeDeleted )
    } )

    await BluebirdPromise.each( pgsToBeAdded, productGroupId => {
      return this.productToProductGroupTable.add( camelToSnakeRecord( { productId, productGroupId } ) )
    } )

    // check attribute values
    const oldAttrValues = old.attributeValue.map( mapId )
    const newAttrValues = product.attributeValue.map( mapId )

    const attrValuesToBeDeleted = oldAttrValues.filter( oId => ! newAttrValues.includes( oId ) )
    const attrValuesToBeAdded = newAttrValues.filter( ( nId: number ) => ! oldAttrValues.includes( nId ) )

    await BluebirdPromise.each( attrValuesToBeDeleted, productAttributeValueId => {
      return this.productToAttributeValueTable.deleteByProductIdAndAttributeValueId( productId, productAttributeValueId )
    } )

    await BluebirdPromise.each( attrValuesToBeAdded, productAttributeValueId => {
      return this.productToAttributeValueTable.add( camelToSnakeRecord( { productId, productAttributeValueId } ) )
    } )

    return this.getById( productId )
  }
}
