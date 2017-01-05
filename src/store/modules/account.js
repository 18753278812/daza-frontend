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
        return this.id !== null && this.id !== 0;
      },
      jwt_token: JSON.parse(localStorage.getItem(AUTH_JWT_TOKEN)),
      id: parseInt(localStorage.getItem(AUTH_USER_ID), 10) || 0,
      user: JSON.parse(localStorage.getItem(AUTH_USER)),
      configs: JSON.parse(localStorage.getItem(AUTH_USER_CONFIGS)),
    },
    register: {
      success: false,
      failure: null,
    },
    login: {
      success: false,
      failure: null,
    },
    logout: {
      success: false,
      failure: null,
    },
    settingsProfile: {
      success: false,
      failure: null,
    },
    settingsPassword: {
      success: false,
      failure: null,
    },
    settingsNotification: {
      success: false,
      failure: null,
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
    // Register
    ACCOUNT_REGISTER_INIT: (state) => {
      Vue.set(state.register, 'success', false);
      Vue.set(state.register, 'failure', null);
    },
    ACCOUNT_REGISTER_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.register, 'success', true);
    },
    ACCOUNT_REGISTER_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.register, 'success', false);
      Vue.set(state.register, 'failure', data);
    },
    // Login
    ACCOUNT_LOGIN_INIT: (state) => {
      Vue.set(state.login, 'success', false);
      Vue.set(state.login, 'failure', null);
    },
    ACCOUNT_LOGIN_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.login, 'success', true);
    },
    ACCOUNT_LOGIN_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.login, 'success', false);
      Vue.set(state.login, 'failure', data);
    },
    // Logout
    ACCOUNT_LOGOUT_INIT: (state) => {
      Vue.set(state.logout, 'success', false);
      Vue.set(state.logout, 'failure', null);
    },
    ACCOUNT_LOGOUT_SUBMIT_SUCCESS: (state) => {
      Vue.set(state.logout, 'success', true);
      Vue.set(state.logout, 'failure', null);
    },
    ACCOUNT_LOGOUT_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.logout, 'success', false);
      Vue.set(state.logout, 'failure', data);
    },
    // Settings
    ACCOUNT_SETTINGS_PROFILE_SUBMIT_SUCCESS: (state, data) => {
      Vue.set(state.settingsProfile, 'success', data.code === 0);
      Vue.set(state.settingsProfile, 'failure', null);
      if (data.code === 0) {
        Vue.set(state.auth, 'user', data.data);
        localStorage.setItem(AUTH_USER, JSON.stringify(data.data));
      }
    },
    ACCOUNT_SETTINGS_PROFILE_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.settingsProfile, 'success', false);
      Vue.set(state.settingsProfile, 'failure', data);
    },
    ACCOUNT_SETTINGS_PASSWORD_SUBMIT_SUCCESS: (state, data) => {
      Vue.set(state.settingsPassword, 'success', data.code === 0);
      Vue.set(state.settingsPassword, 'failure', null);
    },
    ACCOUNT_SETTINGS_PASSWORD_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.settingsPassword, 'success', false);
      Vue.set(state.settingsPassword, 'failure', data);
    },
    ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_SUCCESS: (state, data) => {
      Vue.set(state.settingsNotification, 'success', data.code === 0);
      Vue.set(state.settingsNotification, 'failure', null);
      if (data.code === 0) {
        Vue.set(state.auth, 'configs', data.data);
        localStorage.setItem(AUTH_USER_CONFIGS, JSON.stringify(data.data));
      }
    },
    ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_FAILURE: (state, data) => {
      Vue.set(state.settingsNotification, 'success', false);
      Vue.set(state.settingsNotification, 'failure', data);
    },
  },
  actions: {
    // Register
    accountRegisterInit({ commit }) {
      commit(types.ACCOUNT_REGISTER_INIT);
    },
    accountRegisterSubmit({ commit }, params) {
      api.account_register(params).then((response) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
        commit(types.ACCOUNT_REGISTER_SUBMIT_SUCCESS);
      })
      .catch((response) => {
        commit(types.ACCOUNT_REGISTER_SUBMIT_FAILURE, response.data);
      });
    },
    // Login
    accountLoginInit({ commit }) {
      commit(types.ACCOUNT_LOGIN_INIT);
    },
    accountLoginSubmit({ commit }, params) {
      api.account_login(params).then((response) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.data);
        commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
      })
      .catch((response) => {
        commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
      });
    },
    // Logout
    accountLogoutInit({ commit }) {
      commit(types.ACCOUNT_LOGOUT_INIT);
    },
    accountLogoutSubmit({ commit }) {
      commit(types.ACCOUNT_AUTH_STATUS_CHANGED, { data: null });
      api.account_logout().then(() => {
        commit(types.ACCOUNT_LOGOUT_SUBMIT_SUCCESS);
        commit(types.NOTIFICATION_COUNTS_INIT);
      })
      .catch((response) => {
        commit(types.ACCOUNT_LOGOUT_SUBMIT_FAILURE, response.data);
      });
    },
    // Settings
    accountSettingsInit({ commit }) {
      commit(types.ACCOUNT_SETTINGS_PROFILE_SUBMIT_FAILURE, null);
      commit(types.ACCOUNT_SETTINGS_PASSWORD_SUBMIT_FAILURE, null);
      commit(types.ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_FAILURE, null);
    },
    accountSettingsProfileSubmit({ commit }, params) {
      commit(types.ACCOUNT_SETTINGS_PROFILE_SUBMIT_FAILURE, null);
      api.account_update_profile(params).then((response) => {
        commit(types.ACCOUNT_SETTINGS_PROFILE_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ACCOUNT_SETTINGS_PROFILE_SUBMIT_FAILURE, response.data);
      });
    },
    accountSettingsPasswordSubmit({ commit }, params) {
      commit(types.ACCOUNT_SETTINGS_PASSWORD_SUBMIT_FAILURE, null);
      api.account_password_modify(params).then((response) => {
        commit(types.ACCOUNT_SETTINGS_PASSWORD_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ACCOUNT_SETTINGS_PASSWORD_SUBMIT_FAILURE, response.data);
      });
    },
    accountSettingsNotificationSubmit({ commit }, params) {
      commit(types.ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_FAILURE, null);
      api.account_update_configs(params).then((response) => {
        commit(types.ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_SUCCESS, response.data);
      })
      .catch((response) => {
        commit(types.ACCOUNT_SETTINGS_NOTIFICATION_SUBMIT_FAILURE, response.data);
      });
    },
  },
};
