import { showProductRoute } from '@/router/show-product'

export const externalRoutes = [
  showProductRoute,
  {
    path: '/',
    component: () => import('@/pages/external'),
    meta: {},
    children: [
      {
        name: 'product-group',
        path: 'pg/:id',
        component: () => import('@/pages/external/filter-products'),
      },
      {
        name: 'home',
        path: '',
        component: () => import('@/pages/external/start-page'),
      },
      {
        name: 'about-us',
        path: 'about-us',
        component: () => import('@/pages/external/about-us'),
      },
      {
        name: 'impressum',
        path: 'impressum',
        component: () => import('@/pages/external/impressum'),
      },
      {
        name: 'contact-us',
        path: 'contact-us',
        component: () => import('@/pages/external/contact-us'),
      },
    ],
  },
]
