export const manageManufacturerRoutes = [
  {
    path: 'manage-manufacturers',
    name: 'manage-manufacturers',
    component: () => import('@/pages/internal/manage-manufacturers'),
    meta: {},
    children: [
      {
        path: ':id',
        name: 'manage-manufacturer',
        component: () => import('@/pages/internal/manage-manufacturers/manufacturer'),
        meta: {},
      },
    ],
  },
]
