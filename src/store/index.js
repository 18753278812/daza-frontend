import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

import home from './modules/home';
import account from './modules/account';
import users from './modules/users';
import categories from './modules/categories';
import topics from './modules/topics';
import articles from './modules/articles';
import tags from './modules/tags';
import notifications from './modules/notifications';
import assets from './modules/assets';
import search from './modules/search';
import qiniu from './modules/qiniu';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    home,
    account,
    users,
    categories,
    topics,
    articles,
    tags,
    notifications,
    assets,
    search,
    qiniu,
  },
  strict: debug,
});
