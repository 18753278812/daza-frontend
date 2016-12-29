// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueValidator from 'vue-validator';
import VueLazyload from 'vue-lazyload';

import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';

import App from './App';

Vue.use(VueValidator);
Vue.use(VueLazyload);

// with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './assets/logo.png',
  loading: './assets/logo.png',
  attempt: 1,
});

require('./filters');

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: 'dist/static/images/placeholder_image.png',
//   loading: 'dist/static/images/loading-spin.svg',
//   attempt: 1,
//   adapter: {
//     loaded(listender, Init) {
//       console.log('loaded');
//       console.log(listender);
//       console.log(Init);
//     },
//     loading(listender, Init) {
//       console.log('loading');
//       console.log(listender);
//       console.log(Init);
//     },
//     error(listender, Init) {
//       console.log('error');
//       console.log(listender);
//       console.log(Init);
//     },
//   },
//   filter: {
//     webp({ value }) {
//       const width = 120;
//       const height = 120;
//       // 如是为空，则返回默认占位图
//       if (value === undefined || value === '') {
//         return '/static/images/placeholder_image.png';
//       // 加入参数七牛的图片处理参数
//       } else if (value.indexOf(process.env.DOMAIN_NAME) > -1 ||
//         value.indexOf('clouddn.com') > -1 || value.indexOf('qnssl.com') > -1) {
//         // if (size !== undefined) {
//         //   width = size;
//         //   height = size;
//         // }
//         return `${value}?imageView2/2/w/${width}/h/${height}`;
//       }
//       return value;
//     },
//   },
// });

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// Now the app has started!
