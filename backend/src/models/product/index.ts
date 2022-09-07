import { IManufacturerTable, ManufacturerTable } from "../../db/tables/manufacturers"
import { ProductGroupTable } from "../../db/tables/product-groups"
import { ProductTable } from "../../db/tables/products"
import { ProductToProductGroupTable } from "../../db/tables/product-to-product-groups"
import { IProductGroup, ProductGroupService } from "../product-group"
import { Promise as BluebirdPromise } from 'bluebird'
import { IProductToAttributeValueTable, ProductToAttributeValueTable } from "../../db/tables/product-attribute-to-values"
import { IProductAttributeTable, ProductAttributeTable } from "../../db/tables/product-attributes"
import { ProductAttributeValueTable, tProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { camelToSnakeRecord } from "../../db/helper"
import { DealerTable, tDealerTable } from "../../db/tables/dealers"
import { ProductOfferCurrentTable } from "../../db/tables/product-offers-current"
import { EnumEntityName, FileTable, tFileTable } from "../../db/tables/files"
import { IProductOffer } from "../../db/tables/product-offers-history"

export interface IAttributeValue {
  id: number
  attrId: number
  value: number | string | boolean | null
}

export interface IProduct {
  id: number
  name: string
  description: string | null
  show: boolean
  manufacturer: IManufacturerTable
  productGroups: IProductGroup[]
  eanCode: string | null
  manufacturerProductId: string | null
  attributeValues: IAttributeValue[]
  bestPrice?: number | null
  bestPriceDealer?: tDealerTable | null
  offers?: IProductOffer[]
  files: tFileTable[]
}

export class ProductService {
  private productTable = new ProductTable()
  private productToProductGroupTable = new ProductToProductGroupTable()
  private productGroup = new ProductGroupService()
  private productGroupTable = new ProductGroupTable()
  private manufacturerTable = new ManufacturerTable()
  private productToAttributeValueTable = new ProductToAttributeValueTable()
  private productAttributeTable = new ProductAttributeTable()
  private productAttributeValueTable = new ProductAttributeValueTable()
  private dealerTable = new DealerTable()
  private productOfferCurrentTable = new ProductOfferCurrentTable()
  private fileTable = new FileTable()

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

    const attributeValues = await BluebirdPromise.map( productToAttributeRawValues, async ( attributeRawValue: IProductToAttributeValueTable ) => {
      const attrValue = await this.productAttributeValueTable.getById( attributeRawValue.productAttributeValueId ) as unknown as tProductAttributeValueTable

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

    const bestPriceDealer = await this.dealerTable.getById( baseData.bestPriceDealerId as number )

    const offers = await this.productOfferCurrentTable.getByProductId( id )

    const files = await this.fileTable.getByEntityNameAndInstanceId( EnumEntityName.PRODUCT, id )

    return {
      id,
      name: baseData.name,
      description: baseData.description,
      bestPrice: parseFloat( baseData.bestPrice?.toString() || '0' ),
      bestPriceDealer,
      show: baseData.show,
      manufacturer: manufacturerData,
      productGroups,
      eanCode: baseData.eanCode,
      manufacturerProductId: baseData.manufacturerProductId,
      attributeValues,
      offers,
      files,
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

    // check product description
    if ( old.name !== product.description ) {
      changedProductTableAttrs.description = product.description
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
    const oldAttrValues = old.attributeValues.map( mapId )
    const newAttrValues = product.attributeValues.map( mapId )

    const attrValuesToBeDeleted = oldAttrValues.filter( oId => ! newAttrValues.includes( oId ) )
    const attrValuesToBeAdded = newAttrValues.filter( ( nId: number ) => ! oldAttrValues.includes( nId ) )

    await BluebirdPromise.each( attrValuesToBeDeleted, productAttributeValueId => {
      return this.productToAttributeValueTable.deleteByProductIdAndAttributeValueId( productId, productAttributeValueId )
    } )

    await BluebirdPromise.each( attrValuesToBeAdded, productAttributeValueId => {
      return this.productToAttributeValueTable.add( camelToSnakeRecord( { productId, productAttributeValueId } ) )
    } )

    // files
    const oldFileIds = old.files.map( mapId )
    const newFileIds = product.files.map( mapId )

    const filesToBeDeleted = oldFileIds.filter( oId => ! newFileIds.includes( oId ) )

    await BluebirdPromise.each( filesToBeDeleted, fileId => {
      return this.fileTable.delete( fileId )
    } )

    return this.getById( productId )
  }

  async add( { product, productGroupId }: tProductWithFirstGroupId ): Promise<IProduct | null> {
    const productGroup = await this.productGroup.getById( productGroupId )

    if ( ! productGroup ) {
      throw Error()
    }

    const newProductTable = await this.productTable.add( {
      name: product.name,
      manufacturerId: product.manufacturer.id,
      manufacturerProductId: product.manufacturerProductId,
      eanCode: product.eanCode,
    } )

    const newProduct = await this.getById( newProductTable.id )

    await this.saveChanges( newProduct.id, {
      ...newProduct,
      productGroups: [ productGroup ],
    } )

    return this.getById( newProductTable.id )
  }
}

type tProductWithFirstGroupId = {
  product: any,
  productGroupId: number
}
