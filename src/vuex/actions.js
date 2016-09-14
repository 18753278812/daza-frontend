import account from '../api/account';
import users from '../api/users';
import categories from '../api/categories';
import topics from '../api/topics';
import articles from '../api/articles';
import tags from '../api/tags';

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  RECEIVE_ERRORS,
  RECEIVE_CATEGORIES,
  RECEIVE_TOPICS,
  RECEIVE_ARTICLES,
  RECEIVE_TAGS,
} from './mutation-types';

export const register = ({ dispatch }, username, email, password) => {
  const req = account.register(username, email, password).then((data) => {
    if (data.code === 0) {
      dispatch(REGISTER_SUCCESS, data.data);
      return Promise.resolve(data.data);
    }
    dispatch(RECEIVE_ERRORS, data.errors);
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
  .catch((error) => {
    console.log('not ok');
    console.log(error);
    dispatch(RECEIVE_ERRORS, error.data.errors);
    return Promise.reject(error);
  });
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

export const userShow = ({ dispatch }, id) => {
  const req = users.show(id).then((data) => Promise.resolve(data))
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

export const getTopicList = ({ dispatch }, page) => {
  const req = topics.lists(page).then((data) => {
    dispatch(RECEIVE_TOPICS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const topicShow = ({ dispatch }, id) => {
  const req = topics.show(id).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const topicCreate = ({ dispatch }, params) => {
  const req = topics.store(params).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const topicSubscribe = ({ dispatch }, id) => {
  const req = topics.subscribe(id).then((data) => Promise.resolve(data))
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

export const articleShow = ({ dispatch }, id) => {
  const req = articles.show(id).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const articleCreate = ({ dispatch }, params) => {
  const req = articles.store(params).then((data) => Promise.resolve(data))
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

export const articleCommentList = ({ dispatch }, id, page) => {
  const req = articles.articleCommentList(id, page).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};

export const getTagList = ({ dispatch }, page) => {
  const req = tags.lists(page).then((data) => {
    dispatch(RECEIVE_TAGS, data);
    return Promise.resolve(data);
  })
  .catch((error) => Promise.reject(error));
  return req;
};

export const tagShow = ({ dispatch }, name) => {
  const req = tags.show(name).then((data) => Promise.resolve(data))
  .catch((error) => Promise.reject(error));
  return req;
};
