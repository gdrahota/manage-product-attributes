import Vue from 'vue'
import VueRouter from 'vue-router'
// import { EventBus } from '@/plugins/event-bus'
import { manageManufacturerRoutes } from '@/router/manage-manufacturers'
import { manageProductRoutes } from '@/router/manage-products'
import { manageAttributeRoutes } from '@/router/manage-attributes'
import { manageProductGroupRoutes } from '@/router/manage-product-group'
import { managePreviewRoutes } from '@/router/preview'
import { manageDealerRoutes } from '@/router/manage-dealers'

// import store from '@/store'

Vue.use(VueRouter)

export const routes = [
  ...manageManufacturerRoutes,
  ...manageAttributeRoutes,
  ...manageProductRoutes,
  ...manageProductGroupRoutes,
  ...managePreviewRoutes,
  ...manageDealerRoutes,
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
