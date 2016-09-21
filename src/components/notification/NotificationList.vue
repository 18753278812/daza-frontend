<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-9 col-xs-6">
            <h3>消息通知</h3>
          </div>
          <div class="col-sm-3 col-xs-4 text-xs-right">
            <button
              class="btn btn-sm btn-outline-primary"
              href="#"
              >Mark as read</button>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-sm-12" v-for="entry in notifications">
            <span v-if="entry.reason === 'followed'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 关注了你</span>
            <span v-if="entry.reason === 'subscribed'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 订阅了《<a v-link="{ name: 'topic_detail', params: { id: entry.topic_id }}">{{ entry.topic.name }}</a>》主题</span>
            <span v-if="entry.reason === 'upvoted'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 赞了《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章</span>
            <span v-if="entry.reason === 'comment'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 评论了《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章，{{ entry.article_comment.content}}</span>
            <span v-if="entry.reason === 'mention'"><a v-link="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</a> 在《<a v-link="{ name: 'article_detail', params: { id: entry.article_id }}">{{ entry.article.title }}</a>》文章提到了你，{{ entry.article_comment.content}}</span>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { getNotificationList } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
      notifications: state => state.notifications.all,
    },
    actions: {
      getNotificationList,
    },
  },
  data() {
    return {
    };
  },
  ready() {
    this.getNotificationList();
  },
  components: {
  },
};
</script>

<style scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
