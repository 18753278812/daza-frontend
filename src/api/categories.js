import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('categories', { page });
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
    const req = Vue.http.get(`categories/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`categories/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  destroy(id) {
    const req = Vue.http.delete(`categories/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
