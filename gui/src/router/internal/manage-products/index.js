export const manageProductRoutes = [
  {
    path: 'manage-products/:productGroupId?',
    name: 'manage-products',
    component: () => import('@/pages/internal/manage-products'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-product',
        component: () => import('@/pages/internal/manage-products/product'),
        meta: {},
      },
    ],
  },
]
