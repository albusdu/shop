import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { shopRoutes } from './shopRoutes'

// Not using dynamic layouts because:
// This project simulates a large-scale shop platform, where layout structure is predefined for different sections
// and keeps the codebase predictable and avoids unnecessary re-renders.
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    children: [{ path: '', name: 'Home', component: () => import('@/views/HomeView.vue') }],
  },
  ...shopRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
