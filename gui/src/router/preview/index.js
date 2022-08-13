export const managePreviewRoutes = [
  {
    path: '/preview/:id?',
    name: 'preview',
    component: () => import('@/pages/preview'),
    meta: {},
  },
]
