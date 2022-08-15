import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import Home from '@/pages/home'


Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Home,
    children: [

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
