import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = process.env.API_URL;
// Vue.http.interceptors.push({
//   request(request) {
//     const jwtToken = JSON.parse(window.localStorage.getItem('auth.jwt_token'));
//     if (jwtToken) {
//       Vue.http.headers.common.Authorization = `Bearer ${jwtToken.access_token}`;
//     } else {
//       delete Vue.http.headers.common.Authorization;
//     }
//     return request;
//   },
//   response(response) {
//     if (response.status === 400 || response.status === 401) {
//       // 当 Token 已经失效时，清空所有保存在 localStorage 的数据
//       window.localStorage.clear();
//     }
//     return response;
//   },
// });

export default {
  register(params) {
    return Vue.http.post('account/register', params);
  },
  login(params) {
    return Vue.http.post('account/login', params);
  },
  logout() {
    return Vue.http.post('account/logout');
  },
  profile() {
    return Vue.http.get('account/profile');
  },
  updateProfile(params) {
    return Vue.http.put('account/profile', params);
  },
  updateConfigs(params) {
    return Vue.http.put('account/configs', params);
  },
  passwordModify(params) {
    return Vue.http.post('account/password_modify', params);
  },
};
