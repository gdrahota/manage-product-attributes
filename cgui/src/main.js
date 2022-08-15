import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import { configureAxios } from './store/http/http_client'
import './quasar'

Vue.config.productionTip = false

configureAxios()

localStorage.debug = '*#'

const vueConfig = {
  router,
  store,
  render: h => h(App),
}

new Vue(vueConfig).$mount('#app')
