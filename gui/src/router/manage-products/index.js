export const manageProductRoutes = [
  {
    path: '/manage-products',
    name: 'manage-products',
    component: () => import('@/pages/manage-products'),
    meta: {},
    children: [
      {
        path: ':productGroupId/:id',
        name: 'manage-product',
        component: () => import('@/pages/manage-products/product'),
        meta: {},
      },
    ],
  },
]
