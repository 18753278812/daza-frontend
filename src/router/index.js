import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import _MainWrapperView from '../views/_MainWrapperView';
import _CleanWrapperView from '../views/_CleanWrapperView';

import NotFoundView from '../views/errors/NotFoundView';

import HomeIndexView from '../views/home/IndexView';

import AccountRegisterView from '../views/account/RegisterView';
import AccountLoginView from '../views/account/LoginView';
import AccountLogoutView from '../views/account/LogoutView';
import AccountPasswordForgotView from '../views/account/PasswordForgotView';
import AccountPasswordResetView from '../views/account/PasswordResetView';
import AccountSettingsView from '../views/account/SettingsView';

import UserDetailView from '../views/users/DetailView';

import CategoryIndexView from '../views/categories/IndexView';

import TopicIndexView from '../views/topics/IndexView';
import TopicCreateView from '../views/topics/CreateView';
import TopicEditView from '../views/topics/EditView';
import TopicDetailView from '../views/topics/DetailView';

import ArticleCreateView from '../views/articles/CreateView';
import ArticleShareView from '../views/articles/ShareView';
import ArticleEditView from '../views/articles/EditView';
import ArticleDetailView from '../views/articles/DetailView';

import TagDetailView from '../views/tags/DetailView';

import NotificationIndexView from '../views/notifications/IndexView';

const document = global.document;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: _MainWrapperView,
      children: [
        {
          path: '/',
          name: 'home_index',
          component: HomeIndexView,
          meta: {
            title: '首页',
          },
        },
        {
          path: 'account/settings',
          component: AccountSettingsView,
          meta: {
            title: '设置',
          },
        },
        {
          name: 'user_detail',
          path: 'users/:id',
          component: UserDetailView,
          meta: {
            title: '用户资料',
          },
        },
        {
          name: 'category_index',
          path: 'categories/:slug',
          component: CategoryIndexView,
          meta: {
            title: '分类',
          },
        },
        {
          path: 'categories',
          redirect: '/categories/latest',
          meta: {
            title: '分类',
          },
        },
        {
          path: 'home/:slug',
          redirect: '/categories/:slug',
        },
        {
          path: 'topics',
          component: TopicIndexView,
          meta: {
            title: '主题广场',
          },
        },
        {
          path: 'topics/create',
          component: TopicCreateView,
          meta: {
            title: '创建主题',
            requiresAuth: true,
          },
        },
        {
          path: 'topics/:slug/edit',
          name: 'topic_edit',
          component: TopicEditView,
          meta: {
            title: '修改主题',
            requiresAuth: true,
          },
        },
        {
          path: 'topics/:slug',
          name: 'topic_detail',
          component: TopicDetailView,
          meta: {
            title: '主题详情',
          },
        },
        {
          path: 'articles/create',
          component: ArticleCreateView,
          meta: {
            title: '发表文章',
            requiresAuth: true,
          },
        },
        {
          path: 'articles/share',
          component: ArticleShareView,
          meta: {
            title: '分享文章',
            requiresAuth: true,
          },
        },
        {
          path: 'articles/:slug/edit',
          name: 'article_edit',
          component: ArticleEditView,
          meta: {
            title: '修改文章',
            requiresAuth: true,
          },
        },
        {
          path: 'articles/:slug',
          name: 'article_detail',
          component: ArticleDetailView,
          meta: {
            title: '文章详情',
          },
        },
        {
          path: 'tags/:name',
          name: 'tag_detail',
          component: TagDetailView,
          meta: {
            title: '标签详情',
          },
        },
        {
          path: 'notifications',
          component: NotificationIndexView,
          meta: {
            title: '消息通知',
            requiresAuth: true,
          },
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
          meta: {
            title: '注册',
          },
        },
        {
          path: 'login',
          component: AccountLoginView,
          meta: {
            title: '登录',
          },
        },
        {
          path: 'logout',
          component: AccountLogoutView,
          meta: {
            title: '注销中...',
          },
        },
        {
          path: 'password_forgot',
          component: AccountPasswordForgotView,
          meta: {
            title: '找回密码',
          },
        },
        {
          path: 'password_reset',
          component: AccountPasswordResetView,
          meta: {
            title: '重置密码',
          },
        },
      ],
    },
    {
      path: '*',
      component: NotFoundView,
    },
  ],
});

router.afterEach((route) => {
  document.title = `${route.meta.title} - daza.io`;
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = store.state.account.auth;
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.check()) {
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
