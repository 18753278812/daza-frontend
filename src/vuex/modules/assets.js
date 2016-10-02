import {
  RECEIVE_ASSET,
} from '../mutation-types';

export default {
  state: {
    all: [],
  },
  mutations: {
    [RECEIVE_ASSET](state, data) {
      Object.assign(state, { all: data.data });
    },
  },
};
