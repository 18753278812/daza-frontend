import Vue from 'vue';

export default {
  lists(page, categoryId, categorySlug) {
    const params = {
      page,
      category_id: categoryId,
      category_slug: categorySlug,
    };
    const req = Vue.http.get('articles', params);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  store() {

  },
  show(id) {
    const req = Vue.http.get(`articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  update(id) {
    const req = Vue.http.put(`articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  destroy(id) {
    const req = Vue.http.delete(`articles/${id}`);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  articleVote(id, type) {
    const req = Vue.http.post(`articles/${id}/votes`, { type });
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  articleComment(id, params) {
    const req = Vue.http.post(`articles/${id}/comments`, params);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
  articleCommentList(id, page) {
    const params = {
      page,
    };
    const req = Vue.http.get(`articles/${id}/comments`, params);
    return req.then((response) => {
      if (response.ok) {
        return Promise.resolve(response.data);
      }
      return Promise.reject(new Error('error'));
    });
  },
};
