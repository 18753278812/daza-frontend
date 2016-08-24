import account from '../api/account';
// import users from '../api/users';
import categories from '../api/categories';
// import topics from '../api/topics';
import articles from '../api/articles';
// import tweets from '../api/tweets';
// import tags from '../api/tags';

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  RECEIVE_CATEGORIES,
  RECEIVE_ARTICLES,
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

export const updateProfile = ({ dispatch }, params) => {
  const req = account.updateProfile(params).then((data) => {
    dispatch(UPDATE_PROFILE_SUCCESS, data);
    return Promise.resolve(data);
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

export const getArticleList = ({ dispatch }, page, categoryId, categorySlug) => {
  const req = articles.lists(page, categoryId, categorySlug).then((data) => {
    dispatch(RECEIVE_ARTICLES, data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const articleVote = ({ dispatch }, id, type) => {
  const req = articles.articleVote(id, type).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const articleComment = ({ dispatch }, id, params) => {
  const req = articles.articleComment(id, params).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const articleCommentList = ({ dispatch }, id) => {
  const req = articles.articleCommentList(id).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};
