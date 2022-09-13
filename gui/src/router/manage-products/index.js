export const manageProductRoutes = [
  {
    path: '/manage-products/:productGroupId?',
    name: 'manage-products',
    component: () => import('@/pages/manage-products'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-product',
        component: () => import('@/pages/manage-products/product'),
        meta: {},
      },
    ],
  },
]
