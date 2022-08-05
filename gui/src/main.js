import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import { configureAxios } from '@/store/http-client'
import router from '@/router'

Vue.config.productionTip = false

configureAxios()

const vueConfig = {
  router,
  store,
  render: h => h(App)
}

new Vue(vueConfig).$mount('#app')
