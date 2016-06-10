import {
  UNAUTHORIZED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './mutation-types';

export default {
  [UNAUTHORIZED](state) {
    console.log('UNAUTHORIZED');
    Object.assign(state, { auth: { id: 0, user: null } });
    localStorage.removeItem('auth.id');
    localStorage.removeItem('auth.user');
    console.log(state.router);
  },
  [REGISTER_SUCCESS](state, user) {
    const auth = { id: user.id, user };
    Object.assign(state, { auth });
    localStorage.setItem('auth.id', user.id);
    localStorage.setItem('auth.user', JSON.stringify(user));
  },
  [REGISTER_FAILURE](state, error) {
    console.log(error);
  },
  [LOGIN_SUCCESS](state, user) {
    const auth = { id: user.id, user };
    Object.assign(state, { auth });
    localStorage.setItem('auth.id', user.id);
    localStorage.setItem('auth.user', JSON.stringify(user));
  },
  [LOGIN_FAILURE](state, error) {
    console.log(state);
    console.log(error);
  },
  [LOGOUT_SUCCESS](state) {
    Object.assign(state, { auth: { id: 0, user: null } });
    localStorage.removeItem('auth.id');
    localStorage.removeItem('auth.user');
  },
  [LOGOUT_FAILURE](state, error) {
    console.log(state);
    console.log(error);
  },
};
