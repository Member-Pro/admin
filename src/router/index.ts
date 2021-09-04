import { createRouter, createWebHistory, NavigationGuardWithThis, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import authService from '@/services/authService';
import Home from '../views/Home.vue'
import GenericRouterBase from '@/views/GenericRouterBase.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue') },

  {
    path: '/achievements',
    name: 'achievements',
    component: GenericRouterBase,
    children: [
      {
        path: '',
        name: 'achievementList',
        component: () => import(/* webpackChunkName: "achievementList" */ '@/views/achievements/AchievementList.vue')
      },
      {
        path: 'edit/:achievementId(\\d+)',
        name: 'achievementEdit',
        component: () => import(/* webpackChunkName: "achievementEdit" */ '@/views/achievements/EditAchievement.vue'),
        props: true,
      },
    ],
  },
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
