import {
  ARTICLE_VOTE_SUCCESS,
  ARTICLE_COMMENT_SUCCESS,
} from '../mutation-types';

export default {
  state: {
  },
  mutations: {
    [ARTICLE_VOTE_SUCCESS](state) {
      //
      console.log(state);
    },
    [ARTICLE_COMMENT_SUCCESS](state) {
      //
      console.log(state);
    },
  },
};
