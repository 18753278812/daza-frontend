<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="row subscriber-list">
        <div class="col-sm-3" v-for="subscriber in data.subscribers">
          <div class="image">
            <img class="lazy img-rounded" :data-original="subscriber.user.avatar_url">
          </div>
          <div class="content">
            <div style="margin: 0;">
              <a class="name" v-link="{ name: 'user_detail', params: { id: subscriber.user.id } }">{{ subscriber.user.name }}</a>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <div class="row data-empty" v-if="data.subscribers.length == 0">
        <div class="col-sm-12">
          <p class="text-xs-center">空空如也</p>
        </div>
      </div>
      <!-- 分页导航 -->
      <vue-pagination :pagination="data.pagination" :callback="loadSubscribers"></vue-pagination>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getTopicSubscriberList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getTopicSubscriberList,
    },
  },
  data() {
    return {
      data: {
        subscribers: [],
        pagination: {
          per_page: 15,
          current_page: 1,
          last_page: 0,
        },
      },
    };
  },
  watch: {
    subscribers() {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    const topicId = this.$route.params.id;
    NProgress.start();
    this.getTopicSubscriberList(topicId).then(data => {
      this.data.subscribers = data.data;
      this.data.pagination = data.pagination;
      NProgress.done();
    });
  },
  components: {
    VuePagination,
  },
  methods: {
    loadSubscribers() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.subscriber-list {
  list-style-type: none;
  padding: 0;
  div {
    .image {
      display: table-cell;
      vertical-align: top;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .content {
      width: 10000px;
      display: table-cell;
      vertical-align: top;
      padding-left: 12px;
      .name {
        font-size: 14px;
      }
    }
  }
  hr {
    margin: 10px 0;
  }
}
</style>
