import { manageAttributeRoutes } from '@/router/internal/manage-attributes'
import { manageDealerRoutes } from '@/router/internal/manage-dealers'
import { manageManufacturerRoutes } from '@/router/internal/manage-manufacturers'
import { manageProductGroupRoutes } from '@/router/internal/manage-product-group'
import { manageProductRoutes } from '@/router/internal/manage-products'

export const internalRoute = [
  {
    path: '/internal',
    component: () => import('@/pages/internal'),
    meta: {},
    children: [
      ...manageAttributeRoutes,
      ...manageDealerRoutes,
      ...manageManufacturerRoutes,
      ...manageProductGroupRoutes,
      ...manageProductRoutes,
    ],
  },
]
