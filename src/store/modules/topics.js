import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    lists: {
      pagination: null,
      data: [],
    },
    entity: null,
    articles: {
      pagination: null,
      data: [],
    },
  },
  mutations: {
    TOPIC_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.lists, 'data', []);
      }
      const lists = state.lists.data.concat(data);
      Vue.set(state.lists, 'pagination', pagination);
      Vue.set(state.lists, 'data', lists);
    },
    TOPIC_GET_ENTITY_SUCCESS: (state, { data }) => {
      Vue.set(state, 'entity', data);
    },
    TOPIC_ARTICLE_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.articles, 'data', []);
      }
      const lists = state.articles.data.concat(data);
      Vue.set(state.articles, 'pagination', pagination);
      Vue.set(state.articles, 'data', lists);
    },
  },
  actions: {
    topicGetLists({ commit }, page) {
      api.topic_get_lists(page).then((response) => {
        commit(types.TOPIC_GET_LISTS_SUCCESS, response.data);
      });
    },
    topicCreateEntity({ commit }, id) {
      api.topic_create_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    topicUpdateEntity({ commit }, id) {
      api.topic_update_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    topicGetEntity({ commit }, id) {
      api.topic_get_entity(id).then((response) => {
        commit(types.TOPIC_GET_ENTITY_SUCCESS, response.data);
      });
    },
    topicArticleGetLists({ commit }, { id, page }) {
      api.topic_article_get_lists(id, page).then((response) => {
        commit(types.TOPIC_ARTICLE_GET_LISTS_SUCCESS, response.data);
      });
    },
    topicGetSubscribers({ commit }, id) {
      api.topic_get_subscribers(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    topicSubscribe({ commit }, id) {
      api.topic_subscribe(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    topicUnsubscribe({ commit }, id) {
      api.topic_unsubscribe(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
