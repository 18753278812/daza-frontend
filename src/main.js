import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VueValidator from 'vue-validator';
import VueResource from 'vue-resource';
import toastr from 'toastr';

import routes from './routes';
import locales from './lang';

import store from './vuex/store';
import { unauthorized } from './vuex/actions';

import App from './App';

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(VueResource);

toastr.options.positionClass = 'toast-bottom-center';
toastr.options.timeOut = 1000;

Vue.config.devtools = true;

Vue.config.lang = 'zh-CN';
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang]);
});

// VueResource 配置
Vue.http.options.root = process.env.API_BASE_URL;
Vue.http.options.xhr = { withCredentials: true };
Vue.http.interceptors.push({
  request(request) {
    return request;
  },
  response(response) {
    if (response.status === 401) {
      console.log(store);
      unauthorized(store);
    }
    return response;
  },
});

// Register email validator function.
Vue.validator('email', (val) => {
  if (!val) {
    return false;
  }
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
});

// 创建一个路由器实例
const router = new VueRouter({
  hashbang: false,
  history: true,
  linkActiveClass: 'active',
  mode: 'html5',
});

// 定义路由规则
router.map(routes);

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 app 匹配的元素上。
router.start(App, 'app');
