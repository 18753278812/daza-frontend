<template>
  <div>
    <div class="ui horizontal divider">
      最新主题
    </div>
    <div class="topics">
      <div class="item" v-for="item in data">
        <a class="ui bordered rounded image">
          <imageView
            :src="item.image_url"
          />
        </a>
        <div class="content">
          <router-link class="header" :to="{ name: 'topic_detail', params: { slug: item.id } }">{{item.name}}</router-link>
          <div class="description">
            <p>{{item.description}}</p>
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
