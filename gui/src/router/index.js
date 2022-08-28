import Vue from 'vue'
import VueRouter from 'vue-router'

import { manageManufacturerRoutes } from '@/router/manage-manufacturers'
import { manageProductRoutes } from '@/router/manage-products'
import { manageAttributeRoutes } from '@/router/manage-attributes'
import { manageProductGroupRoutes } from '@/router/manage-product-group'
import { manageDealerRoutes } from '@/router/manage-dealers'
import { showProductRoutes } from '@/router/show-product'
import { manageSearchProductsRoutes } from '@/router/search-products'

// import store from '@/store'

Vue.use(VueRouter)

export const routes = [
  ...manageAttributeRoutes,
  ...manageDealerRoutes,
  ...manageManufacturerRoutes,
  ...manageProductGroupRoutes,
  ...manageProductRoutes,
  ...manageSearchProductsRoutes,
  ...showProductRoutes,
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
