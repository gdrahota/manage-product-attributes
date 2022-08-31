import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home'
import FilterCategories from '@/pages/filter_categories'
import ProductsPage from '@/pages/products'


Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Home,
    children: [

    ]
  },
  {
    name: 'products',
    path: '/search',
    props: route => ({ query: route.query.q }),
    component: ProductsPage
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
