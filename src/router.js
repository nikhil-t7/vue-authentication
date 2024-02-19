import { createRouter, createWebHistory } from 'vue-router';
import { IS_USER_AUTHENTICATED_GETTER } from './store/storeconstant';
import store from './store/store';

const routes = [
  {
    path: '/',
    component: () => import('./pages/HomeCard.vue'),
  },
  {
    path: '/login',
    component: () => import('./pages/LoginCard.vue'),
    meta: { auth: false },
  },
  {
    path: '/signup',
    component: () => import('./pages/SignUpCard.vue'),
    meta: { auth: false },
  },
  {
    path: '/posts',
    component: () => import('./pages/PostList.vue'),
    meta: { auth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    'auth' in to.meta &&
    to.meta.auth &&
    !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
  ) {
    next('/login');
  } else if (
    'auth' in to.meta &&
    !to.meta.auth &&
    store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
  ) {
    next('/posts');
  } else {
    next();
  }
});
export default router;
