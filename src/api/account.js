import Vue from 'vue';

export default {
  register(username, email, password) {
    return Vue.http.post('v1/account/register', { username, email, password })
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error('error'));
      });
  },
  login(email, password) {
    return Vue.http.post('v1/account/login', { email, password })
      .then((response) => {
        if (response.ok) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error('error'));
      });
  },
  logout() {
    return Vue.http.post('v1/account/logout')
      .then(response => {
        if (response.ok) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('error'));
      });
  },
};
