import Vue from 'vue'
import VueRouter from 'vue-router'

import { externalRoutes } from '@/router/external'
import { internalRoute } from '@/router/internal'

Vue.use(VueRouter)

export const routes = [
  ...internalRoute,
  ...externalRoutes,
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
