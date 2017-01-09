// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import 'nprogress/nprogress.css';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';
import 'simplemde/dist/simplemde.min.css';

import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

import App from './App';

require('./filters');

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// Now the app has started!
