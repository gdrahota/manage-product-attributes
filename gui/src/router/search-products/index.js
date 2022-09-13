export const manageSearchProductsRoutes = [
  {
    path: '/search-products/:id?',
    name: 'search-products',
    component: () => import('@/pages/search-products'),
    meta: {},
  },
]
