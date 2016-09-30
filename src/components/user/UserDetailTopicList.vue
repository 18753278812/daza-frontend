<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="row topic-list">
        <div class="col-md-12" v-for="topic in data.topics">
          <div class="image">
            <img class="lazy img-rounded" :data-original="topic.image_url">
          </div>
          <div class="content">
            <a class="name" v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
            <small class="text-muted">{{ topic.subscriber_count }} 人订阅</small>
            <p class="description">{{ topic.description }}</p>
          </div>
          <hr>
        </div>
      </div>
      <div class="row data-empty" v-if="data.topics.length == 0">
        <div class="col-sm-12">
          <p class="text-xs-center">空空如也</p>
        </div>
      </div>
      <!-- 分页导航 -->
      <vue-pagination :pagination="data.pagination" :callback="loadTopics"></vue-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getUserTopics } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
      // topics: state => state.topics.all,
    },
    actions: {
      getUserTopics,
    },
  },
  data() {
    return {
      data: {
        topics: [],
        pagination: {},
      },
    };
  },
  watch: {
    topics() {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    this.loadTopics(1);
  },
  route: {
    canReuse: false,
  },
  components: {
    VuePagination,
  },
  methods: {
    loadTopics(page) {
      window.scrollTo(0, 0);
      const userId = this.$route.params.id;
      NProgress.start();
      this.getUserTopics(userId, page).then(data => {
        this.data.topics = data.data;
        this.data.pagination = data.pagination;
        NProgress.done();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topic-list {
  list-style-type: none;
  padding: 0;
  div {
    .image {
      display: table-cell;
      vertical-align: top;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .content {
      width: 10000px;
      display: table-cell;
      vertical-align: top;
      padding-left: 12px;
      .name {
        font-size: 14px;
        display: table-cell;
      }
      .description {
        font-size: 12px;
        color: #bbb;
        margin-bottom: 2px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
