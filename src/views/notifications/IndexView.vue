<template>
  <div class="ui main container">
    <h1 class="ui header">消息通知</h1>
    <loader :active="notifications.pagination === null" />
    <div class="ui divided items">
      <div class="item" v-for="entry in notifications.lists" v-bind:class="{ read: !entry.unread }">
        <div class="ui small image">
          <imageView
            class="ui avatar"
            :src="entry.from_user.avatar_url" />
        </div>
        <div class="content">
          <div class="header">
            <!-- 关注了我 -->
            <span v-if="entry.reason === 'followed'">
              <router-link :to="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</router-link> 关注了你
            </span>
            <!-- 订阅了我的主题 -->
            <span v-if="entry.reason === 'subscribed'">
              <router-link :to="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</router-link> 订阅了主题《<router-link :to="{ name: 'topic_detail', params: { slug: entry.topic_id }}">{{ entry.topic.name }}</router-link>》
            </span>
            <!-- 赞了我的文章 -->
            <span v-if="entry.reason === 'upvoted'">
              <router-link :to="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</router-link> 赞了文章《<router-link :to="{ name: 'article_detail', params: { slug: entry.article_id }}">{{ entry.article.title }}</router-link>》
            </span>
            <!-- 评论了文章 -->
            <span v-if="entry.reason === 'comment'">
              <router-link :to="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</router-link> 评论了文章《<router-link :to="{ name: 'article_detail', params: { slug: entry.article_id }}">{{ entry.article.title }}</router-link>》
              <blockquote class="blockquote">{{ entry.article_comment.content}}</blockquote>
            </span>
            <!-- 提及了我 -->
            <span v-if="entry.reason === 'mention'">
              <router-link :to="{ name: 'user_detail', params: { id: entry.from_user_id } }">{{ entry.from_user.name }}</router-link> 在《<router-link :to="{ name: 'article_detail', params: { slug: entry.article_id }}">{{ entry.article.title }}</router-link>》文章提到了你，{{ entry.article_comment.content}}
            </span>
          </div>
          <div class="description" style="display: none;">
            <p></p>
          </div>
          <div class="meta">
            <span class="created_at">{{ entry.created_at | moment }}</span>
          </div>
        </div>
      </div>
    </div>
    <loadMore :pagination="notifications.pagination" :callback="loadMore" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ImageView from '../../components/ImageView';
import Loader from '../../components/Loader';
import LoadMore from '../../components/LoadMore';

export default {
  components: {
    ImageView,
    Loader,
    LoadMore,
  },
  computed: mapState({
    notifications: state => state.notifications.index.notifications,
  }),
  data() {
    return {
    };
  },
  mounted() {
    this.loadMore(1);
  },
  methods: {
    loadMore(page) {
      this.$store.dispatch('notificationIndexGetLists', page);
    },
  },
};
</script>

<style lang="scss" scoped>
.items > .item {
  flex-direction: row;
}
.items > .item > .image + .content {
  padding-top: 0px;
  padding-left: 10px;
  font-size: 72%;
}
.items > .item > .image {
  max-width: 30px;
}
.items > .item > .image > img {
    max-width: 100% !important;
    width: auto !important;
    max-height: 30px !important;
    position: relative;
}
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
