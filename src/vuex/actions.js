import account from '../api/account';
// import users from '../api/users';
import categories from '../api/categories';
// import topics from '../api/topics';
// import articles from '../api/articles';
// import tweets from '../api/tweets';
// import tags from '../api/tags';

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  RECEIVE_CATEGORIES,
} from './mutation-types';

export const register = ({ dispatch }, username, email, password) => {
  const req = account.login(username, email, password).then((data) => {
    dispatch(REGISTER_SUCCESS, data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const login = ({ dispatch }, email, password) => {
  const req = account.login(email, password).then((data) => {
    dispatch(LOGIN_SUCCESS, data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const logout = ({ dispatch }) => {
  const req = account.logout().then(() => {
    dispatch(LOGOUT_SUCCESS);
    return Promise.resolve();
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const getCategoryList = ({ dispatch }, page) => {
  const req = categories.lists(page).then((data) => {
    dispatch(RECEIVE_CATEGORIES, data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};
