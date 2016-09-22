import toastr from 'toastr';
import {
  RECEIVE_ERRORS,
} from '../mutation-types';

export default {
  state: {
  },
  mutations: {
    [RECEIVE_ERRORS](state, data) {
      console.log(data);
      let message = '';
      if (data.message) {
        message = `${data.message}<br>`;
      }
      if (data.errors) {
        data.errors.forEach((value) => {
          message += `${value.message}<br>`;
        });
      }
      toastr.error(message);
    },
  },
};
