import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    index: {
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
    side_tags: [],
    side_links: [],
  },
  mutations: {
    HOME_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.index.articles, 'lists', []);
      }
      const lists = state.index.articles.lists.concat(data);
      Vue.set(state.index.articles, 'lists', lists);
      Vue.set(state.index.articles, 'pagination', pagination);
    },
    HOME_SIDE_AD_GET_ENTITY_SUCCESS: (state, { data }) => {
      if (data.length > 1) {
        Vue.set(state, 'side_ad', data[0]);
      }
    },
    HOME_SIDE_TOPIC_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'side_topics', data);
    },
    HOME_SIDE_TAG_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'side_tags', data);
    },
    HOME_SIDE_LINK_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'side_links', data);
    },
  },
  actions: {
    homeIndexGetLists({ commit }, page) {
      api.article_get_lists(null, 'latest', page).then((response) => {
        commit(types.HOME_INDEX_GET_LISTS_SUCCESS, response.data);
      });
    },
    homeGetData({ commit }) {
      api.topic_article_get_lists('side-ad').then((response) => {
        commit(types.HOME_SIDE_AD_GET_ENTITY_SUCCESS, response.data);
      });
      api.topic_get_lists().then((response) => {
        commit(types.HOME_SIDE_TOPIC_GET_LISTS_SUCCESS, response.data);
      });
      api.tag_get_lists().then((response) => {
        commit(types.HOME_SIDE_TAG_GET_LISTS_SUCCESS, response.data);
      });
      api.topic_article_get_lists('side-links').then((response) => {
        commit(types.HOME_SIDE_LINK_GET_LISTS_SUCCESS, response.data);
      });
    },
  },
};
