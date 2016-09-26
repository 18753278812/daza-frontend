import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VueValidator from 'vue-validator';
import VueResource from 'vue-resource';
import $ from 'jquery';

import routes from './routes';
import locales from './lang';

// import store from './vuex/store';
// import { unauthorized } from './vuex/actions';

import App from './App';

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(VueResource);

Vue.config.devtools = true;

Vue.config.lang = 'zh-CN';
Object.keys(locales).forEach((lang) => {
  Vue.locale(lang, locales[lang]);
});

// VueResource 配置
Vue.http.options.root = process.env.API_URL;
Vue.http.interceptors.push({
  request(request) {
    const jwtToken = JSON.parse(localStorage.getItem('auth.jwt_token'));
    if (jwtToken) {
      Vue.http.headers.common.Authorization = `Bearer ${jwtToken.access_token}`;
    } else {
      delete Vue.http.headers.common.Authorization;
    }
    return request;
  },
  response(response) {
    if (response.statusCode === 401) {
      localStorage.removeItem('auth.id');
      localStorage.removeItem('auth.user');
      localStorage.removeItem('auth.jwt_token');
    }
    return response;
  },
});

// Register email validator function.
Vue.validator('email', (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val));
// Register url validator function.
Vue.validator('url', (val) => /^(http\u003a\/\/|https\u003a\/\/)(.{4,})$/.test(val));

// 自定义指令
$.fn.select2.defaults.set('theme', 'bootstrap');
$.fn.select2.defaults.set('language', 'zh-CN');
Vue.directive('select2', {
  deep: true,
  twoWay: true,
  priority: 1000,
  params: ['placeholder', 'tags'],
  bind() {
    // params 突然无法直接传递 JSON，修改为单个配置!!!
    const self = this;
    const options = {};
    if (this.params.placeholder) {
      Object.assign(options, { placeholder: this.params.placeholder });
    }
    if (this.params.tags) {
      Object.assign(options, { tags: this.params.tags });
    }
    $(this.el)
      .select2(options)
      .on('change', () => {
        self.set($(self.el).val());
      });
  },
  update(value) {
    $(this.el).val(value).trigger('change');
  },
  unbind() {
    $(this.el).off().select2('destroy');
  },
});

// 自定义过滤器
Vue.filter('moment', require('./filters/moment'));

// 创建一个路由器实例
const router = new VueRouter({
  hashbang: false,
  history: true,
  linkActiveClass: 'active',
  mode: 'html5',
});

// 定义路由规则
router.map(routes);
// 定义重定向规则
router.redirect({
  '/': '/home/latest',
});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 app 匹配的元素上。
router.start(App, 'app');
