<template>
  <div class="">
    <div class="ui horizontal divider">
      友情链接
    </div>
    <div class="topics">
      <div class="item" v-for="item in data">
        <a class="ui bordered rounded image" :href="item.link">
          <imageView
            :src="item.image_url"
          />
        </a>
        <div class="content">
          <a class="header" :href="item.link">{{item.title}}</a>
          <div class="description">
            <p>{{item.summary}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from './ImageView';

export default {
  components: {
    ImageView,
  },
  props: {
    data: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
// 友情链接的样式和主题列表一样，所以直接使用了 .topics
.topics {
  .item {
    .content {
      > .header {
        font-size: 17px;
      }
      > .description {
      }
    }
    > .image {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
