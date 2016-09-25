import Vue from 'vue';

export default {
  lists(page, targetType, targetId) {
    const req = Vue.http.get('assets', { page, target_type: targetType, target_id: targetId });
    return req.then((response) => Promise.resolve(response.data));
  },
  store(params) {
    const req = Vue.http.post('assets', params);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id, params) {
    const req = Vue.http.put(`assets/${id}`, params);
    return req.then((response) => Promise.resolve(response.data));
  },
  destroy(id) {
    const req = Vue.http.delete(`assets/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
};
