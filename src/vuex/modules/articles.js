import {
  RECEIVE_ARTICLES,
} from '../mutation-types';

export default {
  state: {
    pagination: {},
    all: [],
  },
  mutations: {
    [RECEIVE_ARTICLES](state, data) {
      Object.assign(state, { pagination: data.pagination, all: data.data });
    },
  },
};
