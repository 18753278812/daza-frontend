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
    },
    detail: {
      topic: {},
      articles: {
        lists: [],
        pagination: null,
      },
    },
  },
  mutations: {
    TOPIC_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.index.topics, 'lists', []);
      }
      const lists = state.index.topics.lists.concat(data);
      Vue.set(state.index.topics, 'lists', lists);
      Vue.set(state.index.topics, 'pagination', pagination);
    },
    TOPIC_DETAIL_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.detail, 'topic', data);
    },
    TOPIC_DETAIL_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination == null || pagination.current_page === 1) {
        Vue.set(state.detail.articles, 'lists', []);
      }
      const lists = state.detail.articles.lists.concat(data);
      Vue.set(state.detail.articles, 'lists', lists);
      Vue.set(state.detail.articles, 'pagination', pagination);
    },
  },
  actions: {
    // TopicIndex
    topicIndexGetLists({ commit }, page) {
      api.topic_get_lists(page).then((response) => {
        commit(types.TOPIC_INDEX_GET_LISTS_SUCCESS, response.data);
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
    // TopicDetail
    topicDetailGetData({ commit }, id) {
      api.topic_get_entity(id).then((response) => {
        commit(types.TOPIC_DETAIL_GET_DATA_SUCCESS, response.data);
      });
    },
    topicDetailGetLists({ commit }, { id, page }) {
      api.topic_article_get_lists(id, page).then((response) => {
        commit(types.TOPIC_DETAIL_GET_LISTS_SUCCESS, response.data);
      });
    },
    topicDetailClean({ commit }) {
      commit(types.TOPIC_DETAIL_GET_DATA_SUCCESS, {});
      commit(types.TOPIC_DETAIL_GET_LISTS_SUCCESS, { data: [], pagination: null });
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
