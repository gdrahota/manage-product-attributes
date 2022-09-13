const getUrls = ( entityName ) => {
  const urls = {
    products: 'products',
    manufacturers: 'manufacturers',
    productGroups: 'product-groups',
    productToProductGroups: 'product-to-product-groups',
    productAttributes: 'product-attributes',
    productAttributeValues: 'product-attribute-values',
    productAttributeGroupOfProductGroup: 'product-attribute-groups-of-product-groups',
    productSearch: 'product-search',
    dealers: 'dealers',
  }

  return `/api/${ urls[ entityName ] }`
}

export const action = async ( actionName, payload, params ) => {
  const config = { payload }

  switch ( actionName ) {
    // products
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
    case 'products.add': {
      config.url = `${ getUrls('products') }`
      config.method = 'POST'
      config.payload = payload
      break
    }

    // productGroups
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
    case 'productGroups.add': {
      config.url = `${ getUrls('productGroups') }`
      config.method = 'POST'
      config.payload = payload
      break
    }

    // productToProductGroups
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

    // manufacturers
    case 'manufacturers.loadAll': {
      config.url = `${ getUrls('manufacturers') }`
      config.method = 'GET'
      break
    }
    case 'manufacturers.add': {
      config.url = `${ getUrls('manufacturers') }`
      config.method = 'POST'
      config.payload = payload
      break
    }
    case 'manufacturers.save': {
      config.url = `${ getUrls('manufacturers') }`
      config.method = 'PUT'
      config.payload = payload
      break
    }

    // dealers
    case 'dealers.loadAll': {
      config.url = `${ getUrls('dealers') }`
      config.method = 'GET'
      break
    }
    case 'dealers.add': {
      config.url = `${ getUrls('dealers') }`
      config.method = 'POST'
      config.payload = payload
      break
    }
    case 'dealers.save': {
      config.url = `${ getUrls('dealers') }`
      config.method = 'PUT'
      config.payload = payload
      break
    }

    // productAttributeValues
    case 'productAttributeValues.loadAll': {
      config.url = `${ getUrls('productAttributeValues') }`
      config.method = 'GET'
      break
    }
    case 'productAttributeValues.add': {
      config.url = `${ getUrls('productAttributeValues') }`
      config.method = 'POST'
      config.payload = payload
      break
    }

    // productAttributes
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

    // productAttributeGroupOfProductGroup
    case 'productAttributeGroupOfProductGroup.getAll': {
      config.url = `${ getUrls('productAttributeGroupOfProductGroup') }`
      config.method = 'GET'
      break
    }
    case 'productAttributeGroupOfProductGroup.getById': {
      config.url = `${ getUrls('productAttributeGroupOfProductGroup') }/${ params.id }`
      config.method = 'GET'
      break
    }
    case 'productAttributeGroupOfProductGroup.save': {
      config.url = `${ getUrls('productAttributeGroupOfProductGroup') }`
      config.method = 'PUT'
      config.payload = payload
      break
    }
    case 'productAttributeGroupOfProductGroup.add': {
      config.url = `${ getUrls('productAttributeGroupOfProductGroup') }`
      config.method = 'POST'
      config.payload = payload
      break
    }

    // productSearch
    case 'productSearch.search': {
      config.url = `${ getUrls('productSearch') }/search/${ params.searchStr }/${ params.page }/${ params.itemsPerPage }`
      config.method = 'GET'
      break
    }
    case 'productSearch.filter': {
      config.url = `${ getUrls('productSearch') }/${ params.productGroupId }`
      config.method = 'POST'
      config.payload = payload
      break
    }
    case 'show-products.loadById': {
      config.url = `${ getUrls('productSearch') }/${ params.id }`
      config.method = 'GET'
      break
    }
  }

  const { restClient } = await import('@/store/http-service')
  return restClient(config)
}
