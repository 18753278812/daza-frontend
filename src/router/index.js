import Vue from 'vue';
import VueRouter from 'vue-router';

import _MainWrapperView from '../views/_MainWrapperView';
import _CleanWrapperView from '../views/_CleanWrapperView';

import NotFoundView from '../views/errors/NotFoundView';

import HomeIndexView from '../views/home/IndexView';

import AccountRegisterView from '../views/account/RegisterView';
import AccountLoginView from '../views/account/LoginView';
import AccountLogoutView from '../views/account/LogoutView';

import ArticleDetailView from '../views/articles/DetailView';

Vue.use(VueRouter);

export default new VueRouter({
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
          path: '/categories/:slug',
          component: HomeIndexView,
        },
        {
          path: '/categories',
          redirect: '/categories/latest',
        },
        {
          path: '/home/:slug',
          redirect: '/categories/:slug',
        },
        {
          path: '/articles/:slug',
          component: ArticleDetailView,
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
      ],
    },
    {
      path: '*',
      component: NotFoundView,
    },
  ],
});
