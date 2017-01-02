import Vue from 'vue';
import api from '../../api';
import * as types from '../mutation-types';

const AUTH_JWT_TOKEN = 'auth.jwt_token';
const AUTH_USER = 'auth.user';
const AUTH_USER_ID = 'auth.id';
const AUTH_USER_CONFIGS = 'auth.user_configs';

const localStorage = global.localStorage;
const JSON = global.JSON;

export default {
  state: {
    auth: {
      check() {
        return this.id != null && this.id !== 0;
      },
      jwt_token: JSON.parse(localStorage.getItem(AUTH_JWT_TOKEN)),
      id: localStorage.getItem(AUTH_USER_ID),
      user: JSON.parse(localStorage.getItem(AUTH_USER)),
      configs: JSON.parse(localStorage.getItem(AUTH_USER_CONFIGS)),
    },
    register: {
      status: 0,
    },
    login: {
      status: 0,
    },
    logout: {
      status: 0,
    },
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, { data }) => {
      if (!data) {
        Vue.set(state.auth, 'jwt_token', null);
        Vue.set(state.auth, 'id', 0);
        Vue.set(state.auth, 'user', null);
        Vue.set(state.auth, 'configs', []);
        localStorage.removeItem(AUTH_JWT_TOKEN);
        localStorage.removeItem(AUTH_USER_ID);
        localStorage.removeItem(AUTH_USER);
        localStorage.removeItem(AUTH_USER_CONFIGS);
        return;
      }
      Vue.set(state.auth, 'jwt_token', data.jwt_token);
      Vue.set(state.auth, 'id', data.id);
      Vue.set(state.auth, 'user', data);
      Vue.set(state.auth, 'configs', data.configs);
      localStorage.setItem(AUTH_JWT_TOKEN, JSON.stringify(data.jwt_token));
      localStorage.setItem(AUTH_USER_ID, data.id);
      localStorage.setItem(AUTH_USER, JSON.stringify(data));
      localStorage.setItem(AUTH_USER_CONFIGS, JSON.stringify(data.configs));
    },
    ACCOUNT_REGISTER_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.register, 'status', 0);
    },
    ACCOUNT_LOGIN_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.login, 'status', 0);
    },
    ACCOUNT_LOGOUT_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.logout, 'status', 0);
    },
  },
  actions: {
    // ACCOUNT
    accountRegisterSubmit({ commit }, params) {
      api.account_register(params).then((response) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
        commit(types.ACCOUNT_REGISTER_SUBMIT_SUCCESS);
      });
    },
    accountLoginSubmit({ commit }, params) {
      api.account_login(params).then((response) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
        commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
      });
    },
    accountLogoutSubmit({ commit }) {
      commit(types.ACCOUNT_AUTH_STATUS_CHANGED, { data: null });
      api.account_logout().then(() => {
        commit(types.ACCOUNT_LOGOUT_SUBMIT_SUCCESS);
      });
    },
    accountGetProfile({ commit }) {
      api.account_get_profile().then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    accountUpdateProfile({ commit }, params) {
      api.account_update_profile(params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    accountUpdateConfigs({ commit }, params) {
      api.account_update_configs(params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    accountPasswordReset({ commit }, params) {
      api.account_password_reset(params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
    accountPasswordModify({ commit }, params) {
      api.account_password_modify(params).then((response) => {
        commit(types.REQUEST_SUCCESS, response.data);
      });
    },
  },
};
