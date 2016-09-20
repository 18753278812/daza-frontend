import Vue from 'vue';

export default {
  lists(page) {
    const req = Vue.http.get('notifications', { page });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  show(id) {
    const req = Vue.http.get(`notifications/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    console.log(id);
  },
  destroy(id) {
    const req = Vue.http.delete(`notifications/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  counts() {
    const req = Vue.http.get('notifications/counts');
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  markAsRead() {
    const req = Vue.http.delete('notifications/mark_as_read');
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
