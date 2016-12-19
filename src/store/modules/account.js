import Vue from 'vue';

// const AUTH_JWT_TOKEN = 'auth.jwt_token';
// const AUTH_USER = 'auth.id';
// const AUTH_USER_ID = 'auth.id';
// const AUTH_USER_CONFIGS = 'auth.user_configs';

// const localStorage = global.localStorage;

export default {
  state: {
    auth: {
      check() {
        return this.id !== 0;
      },
      jwt_token: null,
      id: 0,
      user: null,
      configs: [],
    },
  },
  mutations: {
    REGISTER_SUCCESS: (state, { data }) => {
      Vue.set(state.auth, 'jwt_token', data.jwt_token);
      Vue.set(state.auth, 'id', data.id);
      Vue.set(state.auth, 'user', data);
      Vue.set(state.auth, 'configs', data.configs);
    },
    LOGIN_SUCCESS: (state, { data }) => {
      Vue.set(state.auth, 'jwt_token', data.jwt_token);
      Vue.set(state.auth, 'id', data.id);
      Vue.set(state.auth, 'user', data);
      Vue.set(state.auth, 'configs', data.configs);
    },
    LOGOUT_SUCCESS: (state) => {
      Vue.set(state.auth, 'jwt_token', null);
      Vue.set(state.auth, 'id', 0);
      Vue.set(state.auth, 'user', null);
      Vue.set(state.auth, 'configs', []);
    },
  },
};
