import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    create: {
      topics: {
        lists: [],
        pagination: null,
      },
      success: true,
      failure: null,
    },
    edit: {
      topics: {
        lists: [],
        pagination: null,
      },
      article: null,
      success: true,
      failure: null,
    },
    detail: {
      article: null,
      comments: {
        lists: [],
        pagination: null,
      },
      upvote: {
        success: true,
        failure: null,
      },
      subscribe: {
        success: true,
        failure: null,
      },
    },
  },
  mutations: {
    // Article Create
    ARTICLE_CREATE_INIT: (state) => {
      Vue.set(state.create, 'success', false);
      Vue.set(state.create, 'failure', null);
    },
    ARTICLE_CREATE_INIT_GET_OWNTOPICS_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.create.topics, 'lists', data);
      Vue.set(state.create.topics, 'pagination', pagination);
    },
    ARTICLE_CREATE_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.create, 'success', true);
      Vue.set(state.create, 'failure', null);
    },
    ARTICLE_CREATE_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.create, 'success', false);
      Vue.set(state.create, 'failure', data);
    },
    // Article Edit
    ARTICLE_EDIT_INIT: (state) => {
      Vue.set(state.edit, 'article', null);
      Vue.set(state.edit, 'success', false);
      Vue.set(state.edit, 'failure', null);
    },
    ARTICLE_EDIT_INIT_GET_OWNTOPICS_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.edit.topics, 'lists', data);
      Vue.set(state.edit.topics, 'pagination', pagination);
    },
    ARTICLE_EDIT_INIT_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.edit, 'article', data);
    },
    ARTICLE_EDIT_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.edit, 'success', true);
      Vue.set(state.edit, 'failure', null);
    },
    ARTICLE_EDIT_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.edit, 'success', false);
      Vue.set(state.edit, 'failure', data);
    },
    // Article Detail
    ARTICLE_DETAIL_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.detail, 'article', data);
    },
    ARTICLE_DETAIL_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination == null || pagination.current_page === 1) {
        Vue.set(state.detail.comments, 'lists', []);
      }
      const lists = state.detail.comments.lists.concat(data);
      Vue.set(state.detail.comments, 'lists', lists);
      Vue.set(state.detail.comments, 'pagination', pagination);
    },
    ARTICLE_DETAIL_UPVOTE_SUCCESS: (state) => {
      Vue.set(state.detail.upvote, 'success', true);
      Vue.set(state.detail.upvote, 'failure', null);
    },
    ARTICLE_DETAIL_UPVOTE_FAILURE: (state, { data }) => {
      Vue.set(state.detail.upvote, 'success', false);
      Vue.set(state.detail.upvote, 'failure', data);
    },
  },
  actions: {
    // Article Create
    articleCreateInit({ commit }) {
      const userId = localStorage.getItem('auth.id');
      commit(types.ARTICLE_CREATE_INIT);
      api.user_topic_get_lists(userId, 1).then((response) => {
        commit(types.ARTICLE_CREATE_INIT_GET_OWNTOPICS_SUCCESS, response.data);
      });
    },
    articleCreateSubmit({ commit }, params) {
      api.article_create_entity(params).then((response) => {
        commit(types.ARTICLE_CREATE_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ARTICLE_CREATE_SUBMIT_FAILURE, response.data);
      });
    },
    // Article Edit
    articleEditInit({ commit }, id) {
      const userId = localStorage.getItem('auth.id');
      commit(types.ARTICLE_EDIT_INIT);
      api.user_topic_get_lists(userId, 1).then((response) => {
        commit(types.ARTICLE_EDIT_INIT_GET_OWNTOPICS_SUCCESS, response.data);
      });
      api.article_get_entity(id).then((response) => {
        commit(types.ARTICLE_EDIT_INIT_GET_DATA_SUCCESS, response.data);
      });
    },
    articleEditSubmit({ commit }, id) {
      api.article_update_entity(id).then((response) => {
        commit(types.ARTICLE_EDIT_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ARTICLE_EDIT_SUBMIT_FAILURE, response.data);
      });
    },
    // Article Detail
    articleDetailInit({ commit }) {
      commit(types.ARTICLE_DETAIL_GET_DATA_SUCCESS, { data: null });
      commit(types.ARTICLE_DETAIL_GET_LISTS_SUCCESS, { data: [], pagination: null });
      commit(types.ARTICLE_DETAIL_UPVOTE_FAILURE, { data: null });
    },
    articleDetailGetData({ commit }, id) {
      api.article_get_entity(id).then((response) => {
        commit(types.ARTICLE_DETAIL_GET_DATA_SUCCESS, response.data);
      });
    },
    articleDetailGetLists({ commit }, id, page) {
      api.article_comment_get_lists(id, page).then((response) => {
        commit(types.ARTICLE_DETAIL_GET_LISTS_SUCCESS, response.data);
      });
    },
    articleDetailUpvote({ commit }, id) {
      api.article_upvote(id).then((response) => {
        commit(types.ARTICLE_DETAIL_UPVOTE_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ARTICLE_DETAIL_UPVOTE_FAILURE, response.data);
      });
    },
  },
};
