import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    picker: {
      assets: {
        lists: [],
        pagination: null,
      },
      success: false,
      failure: null,
    },
  },
  mutations: {
    ASSET_PICKER_GET_LISTS_SUCCESS: (state, { data, pagination }) => {
      Vue.set(state.picker.assets, 'lists', data);
      Vue.set(state.picker.assets, 'pagination', pagination);
    },
    ASSET_PICKER_SUBMIT_SUCCESS: (state, { data }) => {
      // 将上传好的图片加入到列表里
      const lists = state.picker.assets.lists.concat(data);
      Vue.set(state.picker.assets, 'lists', lists);
      Vue.set(state.picker, 'success', true);
      Vue.set(state.picker, 'failure', null);
    },
    ASSET_PICKER_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.picker, 'success', false);
      Vue.set(state.picker, 'failure', data);
    },
  },
  actions: {
    assetPickerInit({ commit }) {
      commit(types.ASSET_PICKER_GET_LISTS_SUCCESS, { data: [], pagination: null });
      commit(types.ASSET_PICKER_SUBMIT_FAILURE, null);
    },
    assetPickerGetLists({ commit }, { target_type, target_id }) {
      api.asset_get_lists(target_type, target_id).then((response) => {
        commit(types.ASSET_PICKER_GET_LISTS_SUCCESS, response.data);
      });
    },
    assetPickerSubmit({ commit }, params) {
      commit(types.ASSET_PICKER_SUBMIT_FAILURE, null);
      api.asset_create_entity(params).then((response) => {
        commit(types.ASSET_PICKER_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ASSET_PICKER_SUBMIT_FAILURE, response.data);
      });
    },
  },
};
