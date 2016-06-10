import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  auth: {
    id: localStorage.getItem('auth.id'),
    user: JSON.parse(localStorage.getItem('auth.user')),
  },
};

export default new Vuex.Store({
  state,
  mutations,
  strict: true,
});
