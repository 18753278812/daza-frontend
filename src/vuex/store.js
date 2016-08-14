import Vue from 'vue';
import Vuex from 'vuex';
import account from './modules/account';
import categories from './modules/categories';
import topics from './modules/topics';
import articles from './modules/articles';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    account,
    categories,
    topics,
    articles,
  },
  strict: true,
});
