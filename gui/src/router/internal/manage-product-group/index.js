export const manageProductGroupRoutes = [
  {
    path: 'manage-product-groups',
    name: 'manage-product-groups',
    component: () => import('@/pages/internal/manage-product-groups'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-product-group',
        component: () => import('@/pages/internal/manage-product-groups/product-group'),
        meta: {},
      },
    ],
  },
]
