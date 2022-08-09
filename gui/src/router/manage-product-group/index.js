export const manageProductGroupRoutes = [
  {
    path: '/manage-product-groups',
    name: 'manage-product-groups',
    component: () => import('@/pages/manage-product-groups'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-product-group',
        component: () => import('@/pages/manage-product-groups/product-group'),
        meta: {},
      },
    ],
  },
]
