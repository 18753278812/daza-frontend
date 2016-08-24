import {
  RECEIVE_ARTICLES,
} from '../mutation-types';

export default {
  state: {
    all: [],
  },
  mutations: {
    [RECEIVE_ARTICLES](state, articles) {
      Object.assign(state, { all: articles });
    },
  },
};
