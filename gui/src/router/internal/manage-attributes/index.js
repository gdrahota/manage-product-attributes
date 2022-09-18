export const manageAttributeRoutes = [
  {
    path: 'manage-attributes',
    name: 'manage-attributes',
    component: () => import('@/pages/internal/manage-attributes'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-attribute',
        component: () => import('@/pages/internal/manage-attributes/attribute'),
        meta: {},
      },
    ],
  },
]
