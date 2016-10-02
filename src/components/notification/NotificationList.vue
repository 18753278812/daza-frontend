<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-9 col-xs-8">
            <h3>消息通知</h3>
          </div>
          <div class="col-sm-3 col-xs-4 text-xs-right">
            <form @submit.prevent="markAsRead2()" v-if="this.counts.unread_count > 0">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                >标记全部为已读</button>
            </form>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12" v-for="entry in data.lists"  v-bind:class="{ read: !entry.unread }">
            <!-- 关注了我 -->
            <span v-if="entry.reason === 'followed'">
              <a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 关注了你
            </span>
            <!-- 订阅了我的主题 -->
            <span v-if="entry.reason === 'subscribed'">
              <a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 订阅了主题《<a v-link="{ name: 'topic_detail', params: { id: entry.topic_id }}">{{ entry.topic.name }}</a>》
            </span>
            <!-- 赞了我的文章 -->
            <span v-if="entry.reason === 'upvoted'">
              <a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 赞了文章《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》
            </span>
            <!-- 评论了文章 -->
            <span v-if="entry.reason === 'comment'">
              <a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 评论了文章《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》
              <blockquote class="blockquote">{{ entry.article_comment.content}}</blockquote>
            </span>
            <!-- 提及了我 -->
            <span v-if="entry.reason === 'mention'">
              <a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 在《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章提到了你，{{ entry.article_comment.content}}
            </span>
            <div class="row">
              <div class="col-xs-12">
                <small class="text-muted">{{ entry.created_at | moment }}</small>
              </div>
            </div>
            <hr>
          </div>
        </div>
        <div class="row data-empty" v-if="data.lists.length == 0">
          <div class="col-sm-12">
            <p class="text-xs-center">空空如也</p>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="data.pagination" :callback="pageChanged"></vue-pagination>
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
      counts: state => state.notifications.counts,
    },
    actions: {
      getNotificationList,
      markAsRead,
    },
  },
  data() {
    return {
      data: {
        page: 1,
        lists: [],
        pagination: {},
      },
    };
  },
  ready() {
    const page = this.$route.query.page;
    this.load(page);
  },
  components: {
    VuePagination,
  },
  methods: {
    markAsRead2() {
      this.markAsRead().then(() => {
        this.data.lists.forEach((part, index) => {
          this.data.lists[index].unread = false;
        });
      });
    },
    load(page) {
      window.scrollTo(0, 0);
      NProgress.start();
      this.getNotificationList(page).then(data => {
        this.data.lists = data.data;
        this.data.pagination = data.pagination;
        NProgress.done();
      });
    },
    pageChanged(page) {
      this.data.page = page;
      const query = { page: this.data.page };

      this.$route.router.go({ name: 'notification_list', query });
      this.load(this.data.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.read {
  span {
    color: #999999;
  }
  a {
    color: #4f9fcf;
  }
}
blockquote {
  margin-top: 5px;
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
