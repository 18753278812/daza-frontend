import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('tags', { page });
    return req.then((response) => Promise.resolve(response.data));
  },
  store() {

  },
  show(name) {
    const req = Vue.http.get(`tags/${name}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id) {
    const req = Vue.http.put(`tags/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  destroy(id) {
    const req = Vue.http.delete(`tags/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  articles(tagName, page) {
    const query = { page };
    const params = { page };
    const req = Vue.http.get(`tags/${tagName}/articles`, query, params);
    return req.then((response) => Promise.resolve(response.data));
  },
};
