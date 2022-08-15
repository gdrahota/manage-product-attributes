const getUrls = ( entityName ) => {
    const urls = {
        products: 'products'
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
    }

    const { restClient } = await import('@/store/http/http_service')
    return restClient(config)
}