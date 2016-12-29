import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    detail: {
      user: {},
      topics: {
        lists: [],
        pagination: {},
      },
    },
  },
  mutations: {
    USER_DETAIL_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.detail, 'user', data);
    },
    USER_DETAIL_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.detail.topics, 'lists', []);
      }
      const lists = state.detail.topics.lists.concat(data);
      Vue.set(state.detail.topics, 'lists', lists);
      Vue.set(state.detail.topics, 'pagination', pagination);
    },
  },
  actions: {
    // TopicDetail
    userDetailGetData({ commit }, id) {
      api.user_get_entity(id).then((response) => {
        commit(types.USER_DETAIL_GET_DATA_SUCCESS, response.data);
      });
    },
    userDetailGetLists({ commit }, { id, page }) {
      api.user_topic_get_lists(id, page).then((response) => {
        commit(types.USER_DETAIL_GET_LISTS_SUCCESS, response.data);
      });
    },
    userEstablishRelationship({ commit }, id, params) {
      api.user_establish_relationship(id, params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    userGetFollowers({ commit }, id) {
      api.user_get_followers(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    userGetFollowing({ commit }, id) {
      api.user_get_following(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    userGetTopics({ commit }, id) {
      api.user_get_topics(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    userGetSubscribes({ commit }, id) {
      api.user_get_subscribes(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    userGetUpvotes({ commit }, id) {
      api.user_get_upvotes(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
