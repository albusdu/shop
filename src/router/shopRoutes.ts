import type { RouteRecordRaw } from 'vue-router'

export const shopRoutes: Array<RouteRecordRaw> = [
  {
    path: '/products',
    component: () => import('@/layouts/ShopLayout.vue'),
    children: [
      {
        path: '',
        name: 'Products',
        component: () => import('@/views/ProductsView.vue'),
        meta: {
          title: 'Products - Ecwid App',
        },
      },
      {
        path: ':slug',
        name: 'Product',
        component: () => import('@/views/ProductView.vue'),
      },
      {
        path: 'categories/:slug',
        name: 'Category',
        component: () => import('@/views/CategoryView.vue'),
        props: true,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/CartView.vue'),
        meta: {
          title: 'Cart - Ecwid App',
        },
      },
    ],
  },
]
