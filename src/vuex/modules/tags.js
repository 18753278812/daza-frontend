import {
  RECEIVE_TAGS,
} from '../mutation-types';

export default {
  state: {
    all: [],
    latest: [],
  },
  mutations: {
    [RECEIVE_TAGS](state, tags) {
      Object.assign(state, { all: tags });
    },
  },
};
