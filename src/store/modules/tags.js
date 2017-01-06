import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    detail: {
      tag: {},
      articles: {
        lists: [],
        pagination: null,
      },
    },
  },
  mutations: {
    TAG_DETAIL_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.detail, 'tag', data);
    },
    TAG_DETAIL_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination == null || pagination.current_page === 1) {
        Vue.set(state.detail.articles, 'lists', []);
      }
      const lists = state.detail.articles.lists.concat(data);
      Vue.set(state.detail.articles, 'lists', lists);
      Vue.set(state.detail.articles, 'pagination', pagination);
    },
  },
  actions: {
    tagDetailGetData({ commit }, name) {
      api.tag_get_entity(name).then((response) => {
        commit(types.TAG_DETAIL_GET_DATA_SUCCESS, response.data);
      });
    },
    tagDetailGetLists({ commit }, { name, page }) {
      api.tag_article_get_lists(name, page).then((response) => {
        commit(types.TAG_DETAIL_GET_LISTS_SUCCESS, response.data);
      });
    },
  },
};
