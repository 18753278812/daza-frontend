import {
  RECEIVE_FOLLOWERS,
  RECEIVE_FOLLOWING,
} from '../mutation-types';

export default {
  state: {
    followers: [],
    following: [],
  },
  mutations: {
    [RECEIVE_FOLLOWERS](state, data) {
      Object.assign(state, { followers: data });
    },
    [RECEIVE_FOLLOWING](state, data) {
      Object.assign(state, { following: data });
    },
  },
};
