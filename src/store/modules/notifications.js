import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorageglobal.localStorage;
// const JSONglobal.JSON;

export default {
  state: {
    index: {
      notifications: {
        lists: [],
        pagination: {},
      },
    },
  },
  mutations: {
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
    notificationGetCounts({ commit }) {
      api.notification_get_counts().then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    notificationMarkAsRead({ commit }) {
      api.notification_mark_as_read().then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
