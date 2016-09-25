import Vue from 'vue';
import Vuex from 'vuex';
import errors from './modules/errors';
import account from './modules/account';
import users from './modules/users';
import categories from './modules/categories';
import topics from './modules/topics';
import articles from './modules/articles';
import tags from './modules/tags';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    errors,
    account,
    users,
    categories,
    topics,
    articles,
    tags,
    notifications,
  },
  strict: true,
});
