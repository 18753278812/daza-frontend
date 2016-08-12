import Vue from 'vue';

const VER = process.env.API_VERSION;

export default {
  getCategoryList(page) {
    return Vue.http.get(`${VER}/categories`, { page })
      .then((response) => {
        if (response.ok) {
          return Promise.resolve(response.data.data);
        }
        return Promise.reject(new Error('error'));
      });
  },
};
