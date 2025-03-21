import type { RouteRecordRaw } from 'vue-router'

export const shopRoutes: Array<RouteRecordRaw> = [
  {
    path: '/shop',
    component: () => import('@/layouts/ShopLayout.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/ProductView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/CartView.vue'),
      },
    ],
  },
]
