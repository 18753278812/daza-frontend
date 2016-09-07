<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9">
        <h5>主题广场</h5>
        <hr>
        <div>
          <ul>
            <li v-for="topic in topics">
              <a v-link="{ name: 'topic_detail', params: { id: topic.id } }">{{ topic.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-3">
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

<style scoped>
</style>
