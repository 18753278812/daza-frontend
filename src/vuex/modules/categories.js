import {
  RECEIVE_CATEGORIES,
} from '../mutation-types';

export default {
  state: {
    all: [],
  },
  mutations: {
    [RECEIVE_CATEGORIES](state, categories) {
      Object.assign(state, { all: categories });
    },
  },
};
