import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    lists: [],
  },
  mutations: {
    SEARCH_USER_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'lists', data);
    },
    SEARCH_TOPIC_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'lists', data);
    },
    SEARCH_ARTICLE_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'lists', data);
    },
  },
  actions: {
    searchUserGetLists({ commit }, query) {
      api.search_user_get_lists(query).then((response) => {
        commit(types.SEARCH_USER_GET_LISTS_SUCCESS, response.data);
      });
    },
    searchTopicGetLists({ commit }, query) {
      api.search_topic_get_lists(query).then((response) => {
        commit(types.SEARCH_TOPIC_GET_LISTS_SUCCESS, response.data);
      });
    },
    searchArticleGetLists({ commit }, query) {
      api.search_article_get_lists(query).then((response) => {
        commit(types.SEARCH_ARTICLE_GET_LISTS_SUCCESS, response.data);
      });
    },
  },
};
