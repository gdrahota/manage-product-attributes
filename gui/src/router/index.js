import Vue from 'vue'
import VueRouter from 'vue-router'
// import { EventBus } from '@/plugins/event-bus'
import { manageProductRouts } from '@/router/manage-products'
import { manageAttributeRouts } from '@/router/manage-attributes'

// import store from '@/store'

Vue.use(VueRouter)

export const routes = [
  ...manageAttributeRouts,
  ...manageProductRouts,
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
