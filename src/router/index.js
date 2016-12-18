import Vue from 'vue';
import VueRouter from 'vue-router';

import _MainWrapperView from '../views/_MainWrapperView';
import _CleanWrapperView from '../views/_CleanWrapperView';

import NotFoundView from '../views/errors/NotFoundView';

import HomeIndexView from '../views/home/IndexView';

import AccountRegisterView from '../views/account/RegisterView';
import AccountLoginView from '../views/account/LoginView';
import AccountLogoutView from '../views/account/LogoutView';
import AccountPasswordResetView from '../views/account/PasswordResetView';

import UserDetailView from '../views/users/DetailView';

import TopicDetailView from '../views/topics/DetailView';

import ArticleDetailView from '../views/articles/DetailView';

import NotificationIndexView from '../views/notifications/IndexView';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: _MainWrapperView,
      children: [
        {
          path: '/',
          component: HomeIndexView,
        },
        {
          path: 'users/:id',
          component: UserDetailView,
        },
        {
          path: 'categories/:slug',
          component: HomeIndexView,
        },
        {
          path: 'categories',
          redirect: '/categories/latest',
        },
        {
          path: 'home/:slug',
          redirect: '/categories/:slug',
        },
        {
          path: 'topics/:slug',
          component: TopicDetailView,
        },
        {
          name: 'article_detail',
          path: 'articles/:slug',
          component: ArticleDetailView,
        },
        {
          path: 'notifications',
          component: NotificationIndexView,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/account',
      component: _CleanWrapperView,
      children: [
        {
          path: 'register',
          component: AccountRegisterView,
        },
        {
          path: 'login',
          component: AccountLoginView,
        },
        {
          path: 'logout',
          component: AccountLogoutView,
        },
        {
          path: 'password_reset',
          component: AccountPasswordResetView,
        },
      ],
    },
    {
      path: '*',
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loggedIn = false;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn) {
      next({
        path: '/account/login',
        query: { redirect_url: to.fullPath },
      });
      return;
    }
  }
  next();
});

export default router;
