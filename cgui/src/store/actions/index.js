const getUrls = (entityName) => {
  const urls = {
    products: 'products',
    manufacturers: 'manufacturers',
    productGroups: 'product-groups',
    productToProductGroups: 'product-to-product-groups',
    productAttributes: 'product-attributes',
    productAttributeValues: 'product-attribute-values',
    productAttributeGroupOfProductGroup: 'product-attribute-groups-of-product-groups',
    productSearch: 'product-search',
    dealers: 'dealers'
  }

  return `/api/${urls[entityName]}`
}

export const action = async (actionName, payload, params) => {
  const config = {payload}

  switch (actionName) {
    case 'products.loadAll': {
      config.url = `${getUrls('products')}`
      config.method = 'GET'
      break
    }

    case 'products.getById': {
      config.url = `${getUrls('products')}/${params.id}`
      config.method = 'GET'
      break
    }

    case 'productGroups.loadAll': {
      config.url = `${getUrls('productGroups')}`
      config.method = 'GET'
      break
    }

    //product product-group
    case 'productAttributes.loadAll': {
      config.url = `${getUrls('productAttributes')}`
      config.method = 'GET'
      break
    }

    case 'productAttributes.getById': {
      config.url = `${getUrls('productAttributes')}/${params.id}`
      config.method = 'GET'
      break
    }

    case 'productAttributes.save': {
      config.url = `${getUrls('productAttributes')}`
      config.method = 'PUT'
      config.payload = payload
      break
    }
    case 'productAttributes.add': {
      config.url = `${getUrls('productAttributes')}`
      config.method = 'POST'
      config.payload = payload
      break
    }


    // productToProductGroups
    case 'productToProductGroups.loadAll': {
      config.url = `${getUrls('productToProductGroups')}`
      config.method = 'GET'
      break
    }
    case 'productToProductGroups.set': {
      config.url = `${getUrls('productToProductGroups')}/${params.id}`
      config.method = 'PUT'
      config.payload = payload
      break
    }


    // productAttributeValues
    case 'productAttributeValues.loadAll': {
      config.url = `${getUrls('productAttributeValues')}`
      config.method = 'GET'
      break
    }

    case 'productAttributeValues.add': {
      config.url = `${getUrls('productAttributeValues')}`
      config.method = 'POST'
      config.payload = payload
      break
    }

    // productAttributeGroupOfProductGroup
    case 'productAttributeGroupOfProductGroup.getAll': {
      config.url = `${getUrls('productAttributeGroupOfProductGroup')}`
      config.method = 'GET'
      break
    }

    case 'productAttributeGroupOfProductGroup.getById': {
      config.url = `${getUrls('productAttributeGroupOfProductGroup')}/${params.id}`
      config.method = 'GET'
      break
    }

    // productSearch
    case 'productSearch.search': {
      config.url = `${getUrls('productSearch')}/search/${params.searchStr}/${params.page}/${params.itemsPerPage}`
      config.method = 'GET'
      break
    }

    case 'productSearch.filter': {
      config.url = `${getUrls('productSearch')}/${params.productGroupId}`
      config.method = 'POST'
      config.payload = payload
      break
    }

    case 'show-products.loadById': {
      config.url = `${getUrls('productSearch')}/${params.id}`
      config.method = 'GET'
      break
    }
  }

  const {restClient} = await import('@/store/http/http_service')
  return restClient(config)
}
