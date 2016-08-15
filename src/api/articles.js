import Vue from 'vue';

const VER = process.env.API_VERSION;

export default {
  lists(page) {
    const req = Vue.http.get(`${VER}/articles`, { page });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  store() {

  },
  show(id) {
    const req = Vue.http.get(`${VER}/articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`${VER}/articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  destroy(id) {
    const req = Vue.http.delete(`${VER}/articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
