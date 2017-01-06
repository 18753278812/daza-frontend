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
    create: {
      categories: {
        lists: [],
        pagination: null,
      },
      success: true,
      failure: null,
    },
    edit: {
      categories: {
        lists: [],
        pagination: null,
      },
      topic: null,
      success: true,
      failure: null,
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
    // Topic Index
    TOPIC_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.index.topics, 'lists', []);
      }
      const lists = state.index.topics.lists.concat(data);
      Vue.set(state.index.topics, 'lists', lists);
      Vue.set(state.index.topics, 'pagination', pagination);
    },
    // Topic Create
    TOPIC_CREATE_INIT: (state) => {
      Vue.set(state.create, 'success', false);
      Vue.set(state.create, 'failure', null);
    },
    TOPIC_CREATE_INIT_GET_CATEGORIES_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.create.categories, 'lists', data);
      Vue.set(state.create.categories, 'pagination', pagination);
    },
    TOPIC_CREATE_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.create, 'success', true);
      Vue.set(state.create, 'failure', null);
    },
    TOPIC_CREATE_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.create, 'success', false);
      Vue.set(state.create, 'failure', data);
    },
    // Topic Edit
    TOPIC_EDIT_INIT: (state) => {
      Vue.set(state.edit, 'topic', null);
      Vue.set(state.edit, 'success', false);
      Vue.set(state.edit, 'failure', null);
    },
    TOPIC_EDIT_INIT_GET_CATEGORIES_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.edit.categories, 'lists', data);
      Vue.set(state.edit.categories, 'pagination', pagination);
    },
    TOPIC_EDIT_INIT_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.edit, 'topic', data);
    },
    TOPIC_EDIT_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.edit, 'success', true);
      Vue.set(state.edit, 'failure', null);
    },
    TOPIC_EDIT_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.edit, 'success', false);
      Vue.set(state.edit, 'failure', data);
    },
    // Topic Detail
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
    TOPIC_DETAIL_SUBSCRIBE_SUCCESS: (state, { data }) => {
      Vue.set(state.detail, 'subscribe', data);
    },
    TOPIC_DETAIL_SUBSCRIBE_FAILURE: (state, { data }) => {
      Vue.set(state.detail, 'subscribe', data);
    },
  },
  actions: {
    // Topic Index
    topicIndexGetLists({ commit }, page) {
      api.topic_get_lists(page).then((response) => {
        commit(types.TOPIC_INDEX_GET_LISTS_SUCCESS, response.data);
      });
    },
    // Topic Create
    topicCreateInit({ commit }) {
      commit(types.TOPIC_CREATE_INIT);
      api.category_get_lists().then((response) => {
        commit(types.TOPIC_CREATE_INIT_GET_CATEGORIES_SUCCESS, response.data);
      });
    },
    topicCreateSubmit({ commit }, params) {
      api.topic_create_entity(params).then((response) => {
        commit(types.TOPIC_CREATE_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.TOPIC_CREATE_SUBMIT_FAILURE, response.data);
      });
    },
    // Topic Edit
    topicEditInit({ commit }, id) {
      commit(types.TOPIC_EDIT_INIT);
      api.category_get_lists().then((response) => {
        commit(types.TOPIC_EDIT_INIT_GET_CATEGORIES_SUCCESS, response.data);
      });
      api.topic_get_entity(id).then((response) => {
        commit(types.TOPIC_EDIT_INIT_GET_DATA_SUCCESS, response.data);
      });
    },
    topicEditSubmit({ commit }, { id, params }) {
      api.topic_update_entity(id, params).then((response) => {
        commit(types.TOPIC_EDIT_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.TOPIC_EDIT_SUBMIT_FAILURE, response.data);
      });
    },
    // Topic Detail
    topicDetailInit({ commit }) {
      commit(types.TOPIC_DETAIL_GET_DATA_SUCCESS, {});
      commit(types.TOPIC_DETAIL_GET_LISTS_SUCCESS, { data: [], pagination: null });
    },
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
    topicDetailSubscribe({ commit }, id) {
      api.topic_subscribe(id).then((response) => {
        commit(types.TOPIC_DETAIL_SUBSCRIBE_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.TOPIC_DETAIL_SUBSCRIBE_FAILURE, response.data);
      });
    },
  },
};
