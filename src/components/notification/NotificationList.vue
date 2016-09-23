<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-9 col-xs-8">
            <h3>消息通知</h3>
          </div>
          <div class="col-sm-3 col-xs-4 text-xs-right">
            <form @submit.prevent="markAsRead2()">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                >标记全部为已读</button>
            </form>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12" v-for="entry in data.notifications">
            <span>{{entry.unread}}</span>
            <span v-if="entry.reason === 'followed'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 关注了你</span>
            <span v-if="entry.reason === 'subscribed'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 订阅了《<a v-link="{ name: 'topic_detail', params: { id: entry.topic_id }}">{{ entry.topic.name }}</a>》主题</span>
            <span v-if="entry.reason === 'upvoted'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 赞了《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章</span>
            <span v-if="entry.reason === 'comment'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 评论了《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章，{{ entry.article_comment.content}}</span>
            <span v-if="entry.reason === 'mention'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 在《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章提到了你，{{ entry.article_comment.content}}</span>
            <hr>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="data.pagination" :callback="loadNotifications"></vue-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getNotificationList, markAsRead } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
      // notifications: state => state.notifications.all,
    },
    actions: {
      getNotificationList,
      markAsRead,
    },
  },
  data() {
    return {
      data: {
        notifications: [],
        pagination: {
          per_page: 15,
          current_page: 1,
          last_page: 0,
        },
      },
    };
  },
  ready() {
    NProgress.start();
    this.getNotificationList().then(data => {
      this.data.notifications = data.data;
      this.data.pagination = data.pagination;
      NProgress.done();
    });
  },
  components: {
    VuePagination,
  },
  methods: {
    loadNotifications() {
    },
    markAsRead2() {
      this.markAsRead().then(() => {
        this.data.notifications.forEach((value) => {
          Object.assign(value, { unread: false });
        });
      });
    },
  },
};
</script>

<style scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
