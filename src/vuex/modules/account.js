import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../mutation-types';

export default {
  state: {
    auth: {
      id: localStorage.getItem('auth.id'),
      user: JSON.parse(localStorage.getItem('auth.user')),
    },
  },
  mutations: {
    [LOGIN_SUCCESS](state, user) {
      const auth = { id: user.id, user };
      Object.assign(state, { auth });
      localStorage.setItem('auth.id', user.id);
      localStorage.setItem('auth.user', JSON.stringify(user));
      localStorage.setItem('auth.jwt_token', JSON.stringify(user.jwt_token));
    },
    [LOGOUT_SUCCESS](state) {
      Object.assign(state, { auth: { id: 0, user: null } });
      localStorage.removeItem('auth.id');
      localStorage.removeItem('auth.user');
      localStorage.removeItem('auth.jwt_token');
    },
  },
};
