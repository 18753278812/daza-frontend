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
      topics: {
        lists: [],
        pagination: null,
      },
      articles: {
        lists: [],
        pagination: null,
      },
    },
    side_ad: {},
    side_topics: [],
    side_links: [],
  },
  mutations: {
    HOME_INDEX_GET_CATEGORIES_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.index.categories, 'lists', data);
      Vue.set(state.index.categories, 'pagination', pagination);
    },
    HOME_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination == null || pagination.current_page === 1) {
        Vue.set(state.index.articles, 'lists', []);
      }
      const lists = state.index.articles.lists.concat(data);
      Vue.set(state.index.articles, 'lists', lists);
      Vue.set(state.index.articles, 'pagination', pagination);
    },
    HOME_INDEX_SIDE_AD_GET_ENTITY_SUCCESS: (state, { data }) => {
      if (data.length > 1) {
        Vue.set(state, 'side_ad', data[0]);
      }
    },
    HOME_INDEX_SIDE_TOPIC_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'side_topics', data);
    },
    HOME_INDEX_SIDE_LINK_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'side_links', data);
    },
  },
  actions: {
    homeIndexGetData({ commit }) {
      // 获取分类
      api.category_get_lists().then((response) => {
        commit(types.HOME_INDEX_GET_CATEGORIES_SUCCESS, response.data);
      });
      // 获取侧边栏数据
      api.topic_article_get_lists('side-ad').then((response) => {
        commit(types.HOME_INDEX_SIDE_AD_GET_ENTITY_SUCCESS, response.data);
      });
      api.topic_get_lists().then((response) => {
        commit(types.HOME_INDEX_SIDE_TOPIC_GET_LISTS_SUCCESS, response.data);
      });
      api.topic_article_get_lists('side-links').then((response) => {
        commit(types.HOME_INDEX_SIDE_LINK_GET_LISTS_SUCCESS, response.data);
      });
    },
    homeIndexGetLists({ commit }, page) {
      api.article_get_lists(null, 'latest', page).then((response) => {
        commit(types.HOME_INDEX_GET_LISTS_SUCCESS, response.data);
      });
    },
  },
};
