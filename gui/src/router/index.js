import Vue from 'vue'
import VueRouter from 'vue-router'
// import { EventBus } from '@/plugins/event-bus'

// import { appRoutes } from '@/router/app'

// import store from '@/store'

Vue.use(VueRouter)

export const routes = []

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
