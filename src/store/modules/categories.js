import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    index: {
      categories: {
        lists: [],
        pagination: null,
      },
      articles: {
        lists: [],
        pagination: null,
      },
    },
  },
  mutations: {
    CATEGORY_INDEX_GET_CATEGORIES_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.index.categories, 'lists', data);
      Vue.set(state.index.categories, 'pagination', pagination);
    },
    CATEGORY_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination == null || pagination.current_page === 1) {
        Vue.set(state.index.articles, 'lists', []);
      }
      const lists = state.index.articles.lists.concat(data);
      Vue.set(state.index.articles, 'lists', lists);
      Vue.set(state.index.articles, 'pagination', pagination);
    },
  },
  actions: {
    categoryIndexInit({ commit }) {
      commit(types.CATEGORY_INDEX_GET_LISTS_SUCCESS, { data: [], pagination: null });
    },
    categoryIndexGetCategories({ commit }) {
      api.category_get_lists().then((response) => {
        commit(types.CATEGORY_INDEX_GET_CATEGORIES_SUCCESS, response.data);
      });
    },
    categoryIndexGetLists({ commit }, { id, page }) {
      const categoryId = id;
      const categorySlug = id;
      api.article_get_lists(categoryId, categorySlug, page).then((response) => {
        commit(types.CATEGORY_INDEX_GET_LISTS_SUCCESS, response.data);
      });
    },
  },
};
