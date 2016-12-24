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
    ASSET_GET_LISTS_SUCCESS: (state, { data }) => {
      Vue.set(state, 'lists', data);
    },
  },
  actions: {
    assetGetLists({ commit }, id) {
      api.asset_get_lists(id).then((response) => {
        commit(types.ASSET_GET_LISTS_SUCCESS, response.data);
      });
    },
    assetCreateEntity({ commit }, params) {
      api.asset_create_entity(params).then((response) => {
        commit(types.ASSET_CREATE_ENTITY_SUCCESS, response.data);
      });
    },
  },
};
