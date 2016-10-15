<template>
  <div class="row" v-if="data.article.image_url">
    <div class="col-xs-12">
      <div class="card">
        <div class="image-container">
          <a v-link="{ name: 'article_detail', params: { id: data.article.id} }" target="_blank">
            <img class="lazy card-img-top" :data-original="data.article.image_url | thumbnail 400">
          </a>
        </div>
        <div class="card-block">
          <p class="card-text">{{ data.article.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getTopicArticleList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getTopicArticleList,
    },
  },
  data() {
    return {
      data: {
        article: {
          image_url: '',
        },
      },
    };
  },
  ready() {
    this.getTopicArticleList('side-ad', 1, 1).then(data => {
      if (data.data.length > 0) {
        this.data.article = data.data[0];
      }
    });
  },
};
</script>

<style lang="scss" scoped>
// 侧边样主题列表样式
.card {
  margin-bottom: 0;
}
.image-container {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
}
</style>
