import { createRouter, createWebHistory, NavigationGuardWithThis, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import authService from '@/services/authService';
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue') },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
})

const onAuthRequired = async (from: RouteLocationNormalized) => {
  if (from.meta.requiresAuth && !await authService.isAuthenticated()) {
    return '/login';
  }
};

router.beforeEach(onAuthRequired);

export default router;
