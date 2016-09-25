import Vue from 'vue';

export default {
  lists(page, categoryId, categorySlug) {
    const params = {
      page,
      category_id: categoryId,
      category_slug: categorySlug,
    };
    const req = Vue.http.get('articles', params);
    return req.then((response) => Promise.resolve(response.data));
  },
  store(params) {
    const req = Vue.http.post('articles', params);
    return req.then((response) => Promise.resolve(response.data));
  },
  show(id) {
    const req = Vue.http.get(`articles/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  update(id) {
    const req = Vue.http.put(`articles/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  destroy(id) {
    const req = Vue.http.delete(`articles/${id}`);
    return req.then((response) => Promise.resolve(response.data));
  },
  articleVote(id, type) {
    const req = Vue.http.post(`articles/${id}/votes`, { type });
    return req.then((response) => Promise.resolve(response.data));
  },
  articleComment(id, params) {
    const req = Vue.http.post(`articles/${id}/comments`, params);
    return req.then((response) => Promise.resolve(response.data));
  },
  articleCommentList(id, page) {
    const params = {
      page,
    };
    const req = Vue.http.get(`articles/${id}/comments`, params);
    return req.then((response) => Promise.resolve(response.data));
  },
};
