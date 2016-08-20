import Vue from 'vue';

const VER = process.env.API_VERSION;

export default {
  // 用户注册
  register(username, email, password) {
    const req = Vue.http.post(`${VER}/account/register`, { username, email, password });
    return req.then(response => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  // 用户登录
  login(email, password) {
    const req = Vue.http.post(`${VER}/account/login`, { email, password });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  // 用户注销
  logout() {
    const req = Vue.http.post(`${VER}/account/logout`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('error'));
    });
  },
  // 当前用户资料
  profile() {
    const req = Vue.http.post(`${VER}/account/profile`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  // 更新当前登录用户资料
  updateProfile(params) {
    const req = Vue.http.put(`${VER}/account/profile`, params);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
