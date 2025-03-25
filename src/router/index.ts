import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import { shopRoutes } from './shopRoutes'
import { formatSlugToTitle } from '@/utils/formatString'

// Not using dynamic layouts because:
// This project simulates a large-scale shop platform, where layout structure is predefined for different sections
// and keeps the code predictable and avoids unnecessary re-renders.
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: 'Home - Ecwid App',
          description: "Description about Ecwid App's home page",
        },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: {
          title: 'About - Ecwid App',
          description: "Description about Ecwid App's about page",
        },
      },
    ],
  },
  ...shopRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // For back/forward navigation
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

router.beforeEach((to: RouteLocationNormalized) => {
  let title: string = 'Ecwid App'

  if (to.meta.title) {
    title = to.meta.title as string
  }

  if ((to.name === 'Category' || to.name === 'Product') && to.params.slug) {
    const slug = to.params.slug as string
    title = `${formatSlugToTitle(slug)} - Ecwid App`
  }

  document.title = title
})

export default router
