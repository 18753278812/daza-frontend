<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-10">
            <h3>主题广场</h3>
          </div>
          <div class="col-sm-2 text-xs-right">
            <a class="btn btn-secondary btn-sm" v-link="{ name: 'topic_create' }">创建主题</a>
          </div>
        </div>
        <hr>
        <div class="row topic-list">
          <div class="col-sm-4" v-for="topic in topics">
            <div class="image">
              <img class="img-rounded" v-lazy="topic.image_url">
            </div>
            <div class="content">
              <a class="name" v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
              <small class="text-muted">{{ topic.subscriber_count }} 人订阅</small>
              <p class="description">{{ topic.description }}</p>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-sm-4" style="display: none;">
        <div class="row">
          <div class="col-xs-6">
            <h5>TITLE</h5>
          </div>
          <div class="col-xs-6 text-xs-right">

          </div>
          <div class="col-xs-12">
            <p>
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getTopicList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';
import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
      topics: state => state.topics.all,
    },
    actions: {
      getTopicList,
    },
  },
  data() {
    return {
      pagination: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 0,
        from: null,
        to: null,
      },
    };
  },
  ready() {
    // 加载最新主题
    NProgress.start();
    this.getTopicList(1).then(data => {
      this.pagination = data.pagination;
      NProgress.done();
    });
  },
  components: {
    VuePagination,
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
        height: 32px;
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
