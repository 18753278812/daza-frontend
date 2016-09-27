import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_CONFIGS_SUCCESS,
} from '../mutation-types';

export default {
  state: {
    auth: {
      id: localStorage.getItem('auth.id'),
      user: JSON.parse(localStorage.getItem('auth.user')),
      jwt_token: JSON.parse(localStorage.getItem('auth.jwt_token')),
      configs: JSON.parse(localStorage.getItem('auth.configs')),
    },
  },
  mutations: {
    [REGISTER_SUCCESS](state, user) {
      const auth = { id: user.id, user, configs: user.configs };
      Object.assign(state, { auth });
      localStorage.setItem('auth.id', user.id);
      localStorage.setItem('auth.user', JSON.stringify(user));
      localStorage.setItem('auth.jwt_token', JSON.stringify(user.jwt_token));
      localStorage.setItem('auth.configs', JSON.stringify(user.configs));
    },
    [LOGIN_SUCCESS](state, user) {
      const auth = { id: user.id, user, configs: user.configs };
      Object.assign(state, { auth });
      localStorage.setItem('auth.id', user.id);
      localStorage.setItem('auth.user', JSON.stringify(user));
      localStorage.setItem('auth.jwt_token', JSON.stringify(user.jwt_token));
      localStorage.setItem('auth.configs', JSON.stringify(user.configs));
    },
    [LOGOUT_SUCCESS](state) {
      Object.assign(state, { auth: { id: 0, user: null } });
      localStorage.removeItem('auth.id');
      localStorage.removeItem('auth.user');
      localStorage.removeItem('auth.jwt_token');
    },
    [UPDATE_PROFILE_SUCCESS](state, user) {
      const auth = { id: user.id, user };
      Object.assign(state, { auth });
      localStorage.setItem('auth.id', user.id);
      localStorage.setItem('auth.user', JSON.stringify(user));
    },
    [UPDATE_CONFIGS_SUCCESS](state, configs) {
      Object.assign(state, { configs });
      localStorage.setItem('auth.configs', JSON.stringify(configs));
    },
  },
};
