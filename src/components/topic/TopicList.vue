<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-8">
            <h3>主题广场</h3>
          </div>
          <div class="col-sm-4 text-sm-right">
            <a v-link="{ name: 'user_detail', params: { id: 0 }}">已订阅0个主题</a>
          </div>
        </div>
        <hr>
        <div>
          <ul class="topic-list">
            <li v-for="topic in topics ">
              <div class="image">
                <img v-lazy="topic.image_url">
              </div>
              <div class="content">
                <a class="name" v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
                <p class="description">{{ topic.description }}</p>
                <small class="text-muted">{{ topic.subscriber_count }}订阅</small>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-4">
        <h5>热门主题</h5>
        <ul class="nav nav-pills nav-stacked">
          <li class="nav-item">
            <a class="nav-link" href="#">主题广场</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">我收藏的文章</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">我赞过的文章</a>
          </li>
        </ul>
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
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.topic-list {
  list-style-type: none;
  padding: 0;
  li {
    margin: 10px 0 10px 0;
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
      padding-left: 8px;
      .name {
        font-size: 15px;
      }
      .description {
        font-size: 12px;
        color: #bbb;
        margin-bottom: 2px;
      }
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
