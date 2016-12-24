import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

// const localStorage = global.localStorage;
// const JSON = global.JSON;

export default {
  state: {
    token: null,
  },
  mutations: {
    QINIU_GET_TOKEN_SUCCESS: (state, { data }) => {
      Vue.set(state, 'token', data);
    },
  },
  actions: {
    qiniuGetToken({ commit }) {
      api.qiniu_get_token().then((response) => {
        commit(types.QINIU_GET_TOKEN_SUCCESS, response.data);
      });
    },
  },
};
