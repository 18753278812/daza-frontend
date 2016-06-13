import Vue from 'vue';

const VER = process.env.API_VERSION;

export default {
  register(username, email, password) {
    return Vue.http.post(`${VER}/account/register`, { username, email, password })
      .then(response => {
        if (response.ok) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error('error'));
      });
  },
  login(email, password) {
    return Vue.http.post(`${VER}/account/login`, { email, password })
      .then((response) => {
        if (response.ok) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error('error'));
      });
  },
  logout() {
    console.log(`${VER}/account/logout`);
    return Vue.http.post(`${VER}/account/logout`)
      .then(response => {
        if (response.ok) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('error'));
      });
  },
};
