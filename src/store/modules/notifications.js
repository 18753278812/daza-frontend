import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    counts: {
      count: 0,
      unread_count: 0,
    },
    index: {
      notifications: {
        lists: [],
        pagination: null,
      },
    },
  },
  mutations: {
    NOTIFICATION_COUNTS_GET_DATA_SUCCESS: (state, { data }) => {
      Vue.set(state.counts, 'count', data.count);
      Vue.set(state.counts, 'unread_count', data.unread_count);
    },
    NOTIFICATION_INDEX_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      if (pagination.current_page === 1) {
        Vue.set(state.index.notifications, 'lists', []);
      }
      const lists = state.index.notifications.lists.concat(data);
      Vue.set(state.index.notifications, 'lists', lists);
      Vue.set(state.index.notifications, 'pagination', pagination);
    },
    NOTIFICATION_GET_ENTITY_SUCCESS: (state, { data }) => {
      Vue.set(state, 'entity', data);
    },
  },
  actions: {
    notificationCountsGetData({ commit }) {
      api.notification_get_counts().then((response) => {
        commit(types.NOTIFICATION_COUNTS_GET_DATA_SUCCESS, response.data);
      });
    },
    notificationCountsClean({ commit }) {
      commit(types.NOTIFICATION_COUNTS_GET_DATA_SUCCESS, {
        data: {
          count: 0,
          unread_count: 0,
        },
      });
    },
    notificationIndexGetLists({ commit }, page) {
      api.notification_get_lists(page).then((response) => {
        commit(types.NOTIFICATION_INDEX_GET_LISTS_SUCCESS, response.data);
      });
    },
    notificationDeleteEntity({ commit }, id) {
      api.notification_delete_entity(id).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    notificationGetEntity({ commit }, id) {
      api.notification_get_entity(id).then((response) => {
        commit(types.NOTIFICATION_GET_ENTITY_SUCCESS, response.data);
      });
    },
    notificationMarkAsRead({ commit }) {
      api.notification_mark_as_read().then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
