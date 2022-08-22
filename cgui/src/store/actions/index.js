const getUrls = ( entityName ) => {
    const urls = {
        products: 'products',
        productGroups: 'product-groups',
        productToProductGroups: 'product-to-product-groups',
        productAttributes: 'product-attributes',
        productAttributeValues: 'product-attribute-values',
        productAttributeGroupOfProductGroup: 'product-attribute-groups-of-product-groups',
        productSearch: 'product-search',
    }

    return `/api/${ urls[ entityName ]}`
}

export const action = async ( actionName, payload, params ) => {
    const config = { payload }

    switch ( actionName ) {
        case 'products.loadAll': {
            config.url = `${getUrls('products')}`
            config.method = 'GET'
            break
        }

        case 'productGroups.loadAll': {
            config.url = `${getUrls('productGroups')}`
            config.method = 'GET'
            break
        }

        case 'productAttributeValues.loadAll': {
            config.url = `${ getUrls('productAttributeValues') }`
            config.method = 'GET'
            break
        }

        //product attributes
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

        // productSearch
        case 'productSearch.search': {
            config.url = `${ getUrls('productSearch') }/${ params.productGroupId }`
            config.method = 'POST'
            config.payload = payload
            break
        }
    }

    const { restClient } = await import('@/store/http/http_service')
    return restClient(config)
}