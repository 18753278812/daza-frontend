import Vue from 'vue';

export default {
  show(id) {
    const req = Vue.http.get(`users/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id) {
    const req = Vue.http.put(`users/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  relationship(id, action) {
    const req = Vue.http.post(`users/${id}/relationship`, { action });
    return req.then((response) => Promise.resolve(response.data));
  },
  followers(id) {
    const req = Vue.http.get(`users/${id}/followers`);
    return req.then((response) => Promise.resolve(response.data));
  },
  following(id) {
    const req = Vue.http.get(`users/${id}/following`);
    return req.then((response) => Promise.resolve(response.data));
  },
  topics(id) {
    const req = Vue.http.get(`users/${id}/topics`);
    return req.then((response) => Promise.resolve(response.data));
  },
};
