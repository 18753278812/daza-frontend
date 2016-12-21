import Vue from 'vue';

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
  },
  mutations: {
    REGISTER_SUCCESS: (state, { data }) => {
      Vue.set(state.auth, 'jwt_token', data.jwt_token);
      Vue.set(state.auth, 'id', data.id);
      Vue.set(state.auth, 'user', data);
      Vue.set(state.auth, 'configs', data.configs);
      localStorage.setItem(AUTH_JWT_TOKEN, JSON.stringify(data.jwt_token));
      localStorage.setItem(AUTH_USER_ID, data.id);
      localStorage.setItem(AUTH_USER, JSON.stringify(data));
      localStorage.setItem(AUTH_USER_CONFIGS, JSON.stringify(data.configs));
    },
    LOGIN_SUCCESS: (state, { data }) => {
      Vue.set(state.auth, 'jwt_token', data.jwt_token);
      Vue.set(state.auth, 'id', data.id);
      Vue.set(state.auth, 'user', data);
      Vue.set(state.auth, 'configs', data.configs);
      localStorage.setItem(AUTH_JWT_TOKEN, JSON.stringify(data.jwt_token));
      localStorage.setItem(AUTH_USER_ID, data.id);
      localStorage.setItem(AUTH_USER, JSON.stringify(data));
      localStorage.setItem(AUTH_USER_CONFIGS, JSON.stringify(data.configs));
    },
    LOGOUT_SUCCESS: (state) => {
      Vue.set(state.auth, 'jwt_token', null);
      Vue.set(state.auth, 'id', 0);
      Vue.set(state.auth, 'user', null);
      Vue.set(state.auth, 'configs', []);
      localStorage.removeItem(AUTH_JWT_TOKEN);
      localStorage.removeItem(AUTH_USER_ID);
      localStorage.removeItem(AUTH_USER);
      localStorage.removeItem(AUTH_USER_CONFIGS);
    },
  },
};
