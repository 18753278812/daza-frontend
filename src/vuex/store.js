import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import users from './modules/users';
import categories from './modules/categories';
import topics from './modules/topics';
import articles from './modules/articles';
import tweets from './modules/tweets';
import tags from './modules/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    users,
    categories,
    topics,
    articles,
    tweets,
    tags,
  },
  strict: true,
});
