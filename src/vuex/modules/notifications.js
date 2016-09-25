import {
  RECEIVE_NOTIFICATIONS,
  RECEIVE_NOTIFICATIONS_COUNTS,
} from '../mutation-types';

export default {
  state: {
    all: [],
    counts: {},
  },
  mutations: {
    [RECEIVE_NOTIFICATIONS](state, notifications) {
      Object.assign(state, { all: notifications });
    },
    [RECEIVE_NOTIFICATIONS_COUNTS](state, data) {
      Object.assign(state, { counts: data });
    },
  },
};
