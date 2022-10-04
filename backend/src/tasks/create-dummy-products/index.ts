import { IAttributeValue, IProduct, ProductService } from '../../models/product'
import { ProductGroupService } from '../../models/product-group'
import { ManufacturerTable } from '../../db/tables/manufacturers'
import { tProductAttributeValueTable } from '../../db/tables/product-attribute-values'
import { ProductAttributeValue } from '../../models/product-attribute-value'
import { createManufacturers } from './manufacturers'
import Bluebird from 'bluebird'
import { createProductAttributes } from './product-attributes'
import { createProductGroups } from './product-groups'
import { createProductAttributesOfProductGroups } from './product-attribute-of-product-groups'
import { createAttributesOfProductAttributeGroups } from './attributes-of-product-attribute-groups'
import { createAttributeOfAttributeGroupOfProductGroup } from './attribute-of-attribute-group-of-product-group'
import { createAttributeGroupOfProductGroups } from './attribute-groups-of-product-groups'

export default async () => {
  await createManufacturers()
  await createProductAttributes()
  await createProductGroups()
  await createProductAttributesOfProductGroups()
  await createAttributesOfProductAttributeGroups()
  await createAttributeOfAttributeGroupOfProductGroup()
  await createAttributeGroupOfProductGroups()

  const productModel = new ProductService()

  const productGroupService = new ProductGroupService()
  const productGroups = await productGroupService.getAll()

  const manufacturerTable = new ManufacturerTable()
  const manufacturers = await manufacturerTable.getAll()

  const productAttributeValue = new ProductAttributeValue()

  const generateHeight = async (): Promise<IAttributeValue> => {
    const availableValues = [ 25, 30, 35 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 1,
      decimalValue: availableValues[ Math.floor( Math.random() * 3 ) ],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateWidth = async (): Promise<IAttributeValue> => {
    const availableValues = [ 1134, 1022, 880 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 2,
      decimalValue: availableValues[ Math.floor( Math.random() * 3 ) ],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateDepth = async (): Promise<IAttributeValue> => {
    const availableValues = [ 1722, 1560, 992, 880 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 3,
      decimalValue: availableValues[ Math.floor( Math.random() * 4 ) ],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generateWeight = async (): Promise<IAttributeValue> => {
    const availableValues = [ 12000, 17500, 21500, 23000 ]

    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 4,
      decimalValue: availableValues[ Math.floor( Math.random() * 4 ) ],
      textValue: null,
      boolValue: null
    }

    return await productAttributeValue.add( value ) as unknown as IAttributeValue
  }

  const generatePeakPower = async ( width: number, depth: number ): Promise<IAttributeValue> => {
    const value: Omit<tProductAttributeValueTable, 'id'> = {
      attrId: 5,
      decimalValue: Math.round( width * depth / 5000 ),
      textValue: null,
      boolValue: null
    }

    return (await productAttributeValue.add( value )) as IAttributeValue
  }

  const array = Array.from( Array( 2468 ).keys() )

  await Bluebird.each( array, async ( i, pos ) => {
    const width = await generateWidth()
    const depth = await generateDepth()
    const peekPower = await generatePeakPower( width.value as number, depth.value as number )


    const product: Omit<IProduct, 'id'> = {
      name: `Module EA45-${ pos + 1 }-${ peekPower.value }`,
      productGroups: [ productGroups[ 0 ] ],
      manufacturerProductId: `manufacturerProduct-${ pos + 1 }`,
      files: [],
      manufacturer: manufacturers[ Math.floor( Math.random() * manufacturers.length ) ],
      show: false,
      attributeValues: [
        await generateHeight(),
        width,
        depth,
        await generateWeight(),
        peekPower,
      ],
      description: null,
      eanCode: null
    }

    const savedProduct = await productModel.add( { product, productGroupId: productGroups[ 0 ].id } ) as IProduct

    await productModel.saveChanges( savedProduct?.id as number, {
      id: savedProduct.id,
      ...product
    } )
  } )
}
