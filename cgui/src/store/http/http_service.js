import axios from 'axios'

export const restClient = async ( { method, url, payload, config } ) => {
    const restCallConfig = {
        method: method,
        url: url,
        data: payload,
        config
    }

    const { data } = await axios(restCallConfig)
    return data
} 