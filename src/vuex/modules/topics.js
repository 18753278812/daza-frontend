import {
  RECEIVE_TOPICS,
} from '../mutation-types';

export default {
  state: {
    all: [],
    latest: [],
  },
  mutations: {
    [RECEIVE_TOPICS](state, topics) {
      Object.assign(state, { all: topics });
    },
  },
};
