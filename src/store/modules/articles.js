import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    detail: {
      article: null,
      comments: {
        lists: [],
        pagination: null,
      },
    },
  },
  mutations: {
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
  },
  actions: {
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
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleDetailDownvote({ commit }, id) {
      api.article_downvote(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleDetailCommentCreate({ commit }, id, params) {
      api.article_comment_create_entity(id, params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleDetailCommentDelete({ commit }, id) {
      api.article_comment_delete_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleDetailClean({ commit }) {
      commit(types.ARTICLE_DETAIL_GET_DATA_SUCCESS, { data: null });
      commit(types.ARTICLE_DETAIL_GET_LISTS_SUCCESS, { data: [], pagination: null });
    },
    articleCreateEntity({ commit }, id) {
      api.article_create_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleDeleteEntity({ commit }, id) {
      api.article_delete_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleUpdateEntity({ commit }, id) {
      api.article_update_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleGetVotes({ commit }, id) {
      api.article_get_votes(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    articleViewerGetLists({ commit }, id) {
      api.article_viewer_get_lists(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
