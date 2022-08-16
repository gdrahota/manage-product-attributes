const getUrls = ( entityName ) => {
    const urls = {
        products: 'products',
        productGroups: 'product-groups'
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
    }

    const { restClient } = await import('@/store/http/http_service')
    return restClient(config)
}