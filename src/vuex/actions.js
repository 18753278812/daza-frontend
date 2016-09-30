import account from '../api/account';
import users from '../api/users';
import categories from '../api/categories';
import topics from '../api/topics';
import articles from '../api/articles';
import tags from '../api/tags';
import notifications from '../api/notifications';
import assets from '../api/assets';

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_CONFIGS_SUCCESS,
  PASSWORD_MODIFY_SUCCESS,
  RECEIVE_ERRORS,
  RECEIVE_FOLLOWERS,
  RECEIVE_FOLLOWING,
  RECEIVE_CATEGORIES,
  RECEIVE_TOPICS,
  RECEIVE_TOPIC_ARTICLES,
  RECEIVE_TOPIC_SUBSCRIBERS,
  RECEIVE_ARTICLES,
  RECEIVE_TAGS,
  // RECEIVE_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS_COUNTS,
  RECEIVE_ASSETS,
} from './mutation-types';

export const register = ({ dispatch }, params) => {
  const req = account.register(params).then((data) => {
    dispatch(REGISTER_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const login = ({ dispatch }, params) => {
  const req = account.login(params).then((data) => {
    dispatch(LOGIN_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const logout = ({ dispatch }) => {
  const req = account.logout().then(() => {
    dispatch(LOGOUT_SUCCESS);
    return Promise.resolve();
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getProfile = ({ dispatch }) => {
  const req = account.profile().then((data) => {
    dispatch(LOGIN_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const updateProfile = ({ dispatch }, params) => {
  const req = account.updateProfile(params).then((data) => {
    dispatch(UPDATE_PROFILE_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const updateConfigs = ({ dispatch }, params) => {
  const req = account.updateConfigs(params).then((data) => {
    dispatch(UPDATE_CONFIGS_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const passwordModify = ({ dispatch }, params) => {
  const req = account.passwordModify(params).then((data) => {
    dispatch(PASSWORD_MODIFY_SUCCESS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const userShow = ({ dispatch }, id) => {
  const req = users.show(id).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const userRelationship = ({ dispatch }, id, action) => {
  const req = users.relationship(id, action).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getUserFollowers = ({ dispatch }, id, page) => {
  const req = users.followers(id, page).then((data) => {
    dispatch(RECEIVE_FOLLOWERS, data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getUserFollowing = ({ dispatch }, id, page) => {
  const req = users.following(id, page).then((data) => {
    dispatch(RECEIVE_FOLLOWING, data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getUserTopics = ({ dispatch }, id, page) => {
  const req = users.topics(id, page).then((data) => {
    dispatch(RECEIVE_FOLLOWERS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getCategoryList = ({ dispatch }, page) => {
  const req = categories.lists(page).then((data) => {
    dispatch(RECEIVE_CATEGORIES, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getTopicList = ({ dispatch }, page) => {
  const req = topics.lists(page).then((data) => {
    dispatch(RECEIVE_TOPICS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const topicShow = ({ dispatch }, id) => {
  const req = topics.show(id).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const topicCreate = ({ dispatch }, params) => {
  const req = topics.store(params).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const topicUpdate = ({ dispatch }, id, params) => {
  const req = topics.update(id, params).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const topicSubscribe = ({ dispatch }, id) => {
  const req = topics.subscribe(id).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getTopicArticleList = ({ dispatch }, page, topicId) => {
  const req = topics.articles(page, topicId).then((data) => {
    dispatch(RECEIVE_TOPIC_ARTICLES, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getTopicSubscriberList = ({ dispatch }, page, topicId) => {
  const req = topics.subscribers(page, topicId).then((data) => {
    dispatch(RECEIVE_TOPIC_SUBSCRIBERS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getArticleList = ({ dispatch }, page, slug) => {
  const req = articles.lists(page, slug, slug).then((data) => {
    dispatch(RECEIVE_ARTICLES, data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const articleShow = ({ dispatch }, id) => {
  const req = articles.show(id).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const articleCreate = ({ dispatch }, params) => {
  const req = articles.store(params).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const articleVote = ({ dispatch }, id, type) => {
  const req = articles.articleVote(id, type).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const articleComment = ({ dispatch }, id, params) => {
  const req = articles.articleComment(id, params).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const articleCommentList = ({ dispatch }, id, page) => {
  const req = articles.articleCommentList(id, page).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getTagList = ({ dispatch }, page) => {
  const req = tags.lists(page).then((data) => {
    dispatch(RECEIVE_TAGS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const tagShow = ({ dispatch }, name) => {
  const req = tags.show(name).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getTagArticleList = ({ dispatch }, page, tagName) => {
  const req = tags.articles(page, tagName).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getNotificationList = ({ dispatch }, page) => {
  const req = notifications.lists(page).then((data) => Promise.resolve(data))
  //   dispatch(RECEIVE_NOTIFICATIONS, data);
  //   return Promise.resolve(data);
  // })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getNotificationCounts = ({ dispatch }) => {
  const req = notifications.counts().then((data) => {
    dispatch(RECEIVE_NOTIFICATIONS_COUNTS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const markAsRead = ({ dispatch }) => {
  const req = notifications.markAsRead().then((data) => {
    const counts = {
      count: 0,
      unread_count: 0,
    };
    dispatch(RECEIVE_NOTIFICATIONS_COUNTS, counts);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const getAssetList = ({ dispatch }, page, targetType, targetId) => {
  const req = assets.lists(page, targetType, targetId).then((data) => {
    dispatch(RECEIVE_ASSETS, data.data);
    return Promise.resolve(data);
  })
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};

export const assetCreate = ({ dispatch }, params) => {
  const req = assets.store(params).then((data) => Promise.resolve(data))
  .catch((error) => {
    dispatch(RECEIVE_ERRORS, error.data);
    return Promise.reject(error);
  });
  return req;
};
