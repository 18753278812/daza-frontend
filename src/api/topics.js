import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('topics', { page });
    return req.then((response) => Promise.resolve(response.data));
  },
  store(params) {
    const req = Vue.http.post('topics', params);
    return req.then((response) => Promise.resolve(response.data));
  },
  show(id) {
    const req = Vue.http.get(`topics/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id) {
    const req = Vue.http.put(`topics/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  destroy(id) {
    const req = Vue.http.delete(`topics/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  subscribe(id) {
    const req = Vue.http.post(`topics/${id}/subscribe`);
    return req.then((response) => Promise.resolve(response.data));
  },
  articles(id, page) {
    const params = {
      page,
    };
    const req = Vue.http.get(`topics/${id}/articles`, params);
    return req.then((response) => Promise.resolve(response.data));
  },
};
