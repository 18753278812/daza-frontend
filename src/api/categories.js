import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('categories', { page });
    return req.then((response) => Promise.resolve(response.data));
  },
  show(id) {
    const req = Vue.http.get(`categories/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id) {
    const req = Vue.http.put(`categories/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  destroy(id) {
    const req = Vue.http.delete(`categories/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
};
