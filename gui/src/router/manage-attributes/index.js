export const manageAttributeRouts = [
  {
    path: '/manage-attributes',
    name: 'manage-attributes',
    component: () => import('@/pages/manage-attributes'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-attribute',
        component: () => import('@/pages/manage-attributes/attribute'),
        meta: {},
      },
    ],
  },
]
