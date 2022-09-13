import { IAttributeValue, IProduct, ProductService } from "../../models/product"
import { ProductGroupService } from "../../models/product-group"
import { ManufacturerTable } from "../../db/tables/manufacturers"
import { tProductAttributeValueTable } from "../../db/tables/product-attribute-values"
import { ProductAttributeValue } from "../../models/product-attribute-value"
import Bluebird from "bluebird"

export default async () => {
  const productModel = new ProductService()

  const productGroupService = new ProductGroupService()
  const productGroups = await productGroupService.getAll()

  const manufacturerTable = new ManufacturerTable()
  const manufacturers = await manufacturerTable.getAll()

  const productAttributeValue = new ProductAttributeValue()

  const generateHeight = async (): Promise<IAttributeValue> => {
    const availableValues = [ 25, 30, 35 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 2,
      decimalValue: availableValues[Math.floor( Math.random() * 3 )],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateWidth = async (): Promise<IAttributeValue> => {
    const availableValues = [ 1134, 1022, 880 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 3,
      decimalValue: availableValues[Math.floor( Math.random() * 3 )],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateDepth = async (): Promise<IAttributeValue> => {
    const availableValues = [ 1722, 1560, 992, 880 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 4,
      decimalValue: availableValues[Math.floor( Math.random() * 4 )],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateWeight = async (): Promise<IAttributeValue> => {
    const availableValues = [ 12000, 17500, 21500, 23000 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 14,
      decimalValue: availableValues[Math.floor( Math.random() * 4 )],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generatePeakPower = async (): Promise<IAttributeValue> => {
    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 1,
      decimalValue: Math.round( Math.random() * 100 ) + 240,
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }


  const array = Array.from( Array( 1000 ).keys() )

  await Bluebird.each( array, async ( i, pos ) => {
    const product: Omit<IProduct, 'id'> = {
      name: `product-${ pos + 1 }`,
      productGroups: [ productGroups[0] ],
      manufacturerProductId: `manufacturerProduct-${ pos + 1 }`,
      files: [],
      manufacturer: manufacturers[0],
      show: false,
      attributeValues: [
        await generateHeight(),
        await generateWidth(),
        await generateDepth(),
        await generateWeight(),
        await generatePeakPower(),
      ],
      description: null,
      eanCode: null
    }

    const savedProduct = await productModel.add( { product, productGroupId: productGroups[0].id } ) as IProduct

    await productModel.saveChanges( savedProduct?.id as number, {
      id: savedProduct.id,
      ...product
    } )
  } )

}