import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import { configureAxios } from './store/http/http_client'
import './quasar'
import { registerFilters } from './filters'

Vue.config.productionTip = false

configureAxios()
registerFilters()

localStorage.debug = '*#'

const vueConfig = {
  router,
  store,
  render: h => h(App),
}

new Vue(vueConfig).$mount('#app')
