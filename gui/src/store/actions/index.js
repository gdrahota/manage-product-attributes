const getUrls = ( entityName ) => {
  const urls = {
    products: 'products',
    manufacturers: 'manufacturers',
    productGroups: 'product-groups',
    productToProductGroups: 'product-to-product-groups',
    productAttributes: 'product-attributes',
    productAttributeValue: 'product-attribute-values',
  }

  return `/api/${ urls[ entityName ] }`
}

export const action = async ( actionName, payload, params ) => {
  const config = { payload }

  switch ( actionName ) {
    case 'products.loadAll': {
      config.url = `${ getUrls('products') }`
      config.method = 'GET'
      break
    }
    case 'products.saveChanges': {
      config.url = `${ getUrls('products') }/${ params.id }`
      config.method = 'PUT'
      config.payload = payload
      break
    }

    case 'productGroups.loadAll': {
      config.url = `${ getUrls('productGroups') }`
      config.method = 'GET'
      break
    }
    case 'productGroups.save': {
      config.url = `${ getUrls('productGroups') }`
      config.method = 'PUT'
      config.payload = payload
      break
    }

    case 'productToProductGroups.loadAll': {
      config.url = `${ getUrls('productToProductGroups') }`
      config.method = 'GET'
      break
    }
    case 'productToProductGroups.set': {
      config.url = `${ getUrls('productToProductGroups') }/${ params.id }`
      config.method = 'PUT'
      config.payload = payload
      break
    }

    case 'manufacturers.loadAll': {
      config.url = `${ getUrls('manufacturers') }`
      config.method = 'GET'
      break
    }

    case 'productAttributes.loadAll': {
      config.url = `${ getUrls('productAttributes') }`
      config.method = 'GET'
      break
    }
    case 'productAttributes.getById': {
      config.url = `${ getUrls('productAttributes') }/${ params.id }`
      config.method = 'GET'
      break
    }
    case 'productAttributes.save': {
      config.url = `${ getUrls('productAttributes') }`
      config.method = 'PUT'
      config.payload = payload
      break
    }
    case 'productAttributes.add': {
      config.url = `${ getUrls('productAttributes') }`
      config.method = 'POST'
      config.payload = payload
      break
    }

    case 'productAttributeValue.createProductAttributeValue': {
      config.url = `${ getUrls('productAttributeValue') }/${ payload.productGroupId }/product-attribute/${ payload.attrId }`
      config.method = 'POST'
      config.payload = payload
      break
    }
  }

  const { restClient } = await import('@/store/http-service')
  return restClient(config)
}
