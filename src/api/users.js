import Vue from 'vue';

export default {
  show(id) {
    const req = Vue.http.get(`users/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`users/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  followers(id) {
    const req = Vue.http.get(`users/${id}/followers`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  following(id) {
    const req = Vue.http.get(`users/${id}/following`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  topics(id) {
    const req = Vue.http.get(`users/${id}/topics`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
