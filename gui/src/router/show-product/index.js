export const showProductRoute = {
  path: '/show-product/:id',
  name: 'show-product',
  component: () => import('@/pages/external/show-product'),
  meta: {},
}
