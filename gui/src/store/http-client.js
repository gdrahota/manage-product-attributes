import axios from 'axios'
import Store from '@/store'
import { EventBus } from '@/plugins/event-bus'

export const configureAxios = () => {
  axios.defaults.headers.post[ 'Content-Type' ] = 'application/json'

  axios.interceptors.request.use(request => {
    const xAuthToken = Store.getters[ 'login/getToken' ]
    if ( xAuthToken && xAuthToken !== 'undefined' ) {
      request.headers[ 'X-Auth-Token' ] = xAuthToken
    }
    return request
  })

  const responseSuccessCb = response => {
    const xAuthToken = response.headers[ 'x-auth-token' ]

    if ( xAuthToken && xAuthToken !== 'undefined' ) {
      Store.commit('login/setTokenMutation', xAuthToken)
    }
    return response
  }

  const responseErrorCb = error => {
    if ( error.response.status === 401 && error.response.data === 'TOKEN_EXPIRED' ) {
      EventBus.$emit('token-expired')
    } else {
      return Promise.reject(error)
    }
  }

  axios.interceptors.response.use(responseSuccessCb, responseErrorCb)
}
