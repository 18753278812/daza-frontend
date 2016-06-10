import account from '../api/account';
import {
  UNAUTHORIZED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './mutation-types';

export const unauthorized = ({ dispatch }) => {
  dispatch(UNAUTHORIZED);
};

export const register = ({ dispatch }, username, email, password) => {
  account.register(username, email, password)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        dispatch(REGISTER_SUCCESS, response.data.data);
      }
    })
    .catch((error) => dispatch(REGISTER_FAILURE, error));
};

export const login = ({ dispatch }, email, password) => {
  const ret = account.login(email, password)
    .then(data => {
      dispatch(LOGIN_SUCCESS, data);
      return Promise.resolve(data);
    })
    .catch(error => {
      dispatch(LOGIN_FAILURE, error);
      return Promise.reject(error);
    });
  return ret;
};

export const logout = ({ dispatch }) => {
  console.log('logout');
  return account.logout()
    .then(() => {
      dispatch(LOGOUT_SUCCESS);
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(LOGOUT_FAILURE, error);
      return Promise.reject(error);
    });
};
