import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('topics', { page });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  store(params) {
    const req = Vue.http.post('topics', params);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  show(id) {
    const req = Vue.http.get(`topics/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`topics/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  destroy(id) {
    const req = Vue.http.delete(`topics/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  subscribe(id) {
    const req = Vue.http.post(`topics/${id}/subscribe`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
