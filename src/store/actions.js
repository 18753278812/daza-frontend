import api from '../api';
import * as types from './mutation-types';

export const register = ({ commit }, params) => {
  api.register(params).then((response) => {
    commit(types.REGISTER_SUCCESS, response.data);
  });
};

export const login = ({ commit }, params) => {
  api.login(params).then((response) => {
    commit(types.LOGIN_SUCCESS, response.data);
  });
};

export const logout = ({ commit }) => {
  api.logout().then((response) => {
    commit(types.LOGOUT_SUCCESS, response.data);
  });
};
