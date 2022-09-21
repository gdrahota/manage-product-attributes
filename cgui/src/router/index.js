import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home'
import FilterCategories from '@/pages/filter-categories'
import ProductsPage from '@/pages/products'
import ProductDetail from "@/pages/product-detail";


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
    path: '/filter-categories/:id',
    component: FilterCategories
  },
  {
    name: 'product-details',
    path: '/products/:id',
    component: ProductDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
