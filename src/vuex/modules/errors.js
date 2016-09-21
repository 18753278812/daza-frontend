import toastr from 'toastr';
import {
  RECEIVE_ERRORS,
} from '../mutation-types';

export default {
  state: {
    all: [],
  },
  mutations: {
    [RECEIVE_ERRORS](state, errors) {
      Object.assign(state, { all: errors });
      console.log(errors);
      toastr.error(errors[0].message);
    },
  },
};
