import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from '@/layouts/AppLayout'
import Home from '@/pages/home'
import FilterCategories from '@/pages/filter_categories'


Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Home,
    children: [
      
    ]
  },
  {
    name: 'main_filter',
    path: '/filter-categories',
    component: FilterCategories
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
