import Vue from 'vue';
import VueRouter from 'vue-router';

import _MainWrapperView from '../views/_MainWrapperView';
import _CleanWrapperView from '../views/_CleanWrapperView';

import HomeIndexView from '../views/home/IndexView';

import AccountLoginView from '../views/account/LoginView';

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
      ],
    },
    {
      path: '/account',
      component: _CleanWrapperView,
      children: [
        {
          path: 'login',
          component: AccountLoginView,
        },
      ],
    },
  ],
});
