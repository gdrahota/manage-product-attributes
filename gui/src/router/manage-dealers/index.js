export const manageDealerRoutes = [
  {
    path: '/manage-dealers',
    name: 'manage-dealers',
    component: () => import('@/pages/manage-dealers'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-dealer',
        component: () => import('@/pages/manage-dealers/dealer'),
        meta: {},
      },
    ],
  },
]
