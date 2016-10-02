<template>
  <div class="row" v-if="data.article.image_url">
    <div class="col-xs-12 side-ad">
      <a :href="data.article.link" target="_blank">
        <img class="lazy img-rounded" :data-original="data.article.image_url | thumbnail 200">
      </a>
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
.side-ad {
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
