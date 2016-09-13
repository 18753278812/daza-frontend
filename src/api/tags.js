import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('tags', { page });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  store() {

  },
  show(name) {
    const req = Vue.http.get(`tags/${name}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`tags/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  destroy(id) {
    const req = Vue.http.delete(`tags/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
