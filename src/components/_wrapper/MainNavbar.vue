<template>
  <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
    <div class="container">
      <a class="navbar-brand" v-link="'/'">
        <img alt="Brand" src="../../assets/ic_logo_light.png">
      </a>
      <form class="form-inline pull-xs-left search-form" method="get" action="/search">
        <input
          class="form-control"
          type="text"
          name="keyword"
          placeholder="搜索你感兴趣的内容">
      </form>
      <ul class="nav navbar-nav pull-xs-right" v-if="auth.check()">
        <li class="nav-item">
          <a class="nav-link" v-link="'/notifications'">
            通知 <span class="tag tag-pill tag-danger" v-if="counts.unread_count > 0">{{ counts.unread_count }}</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <img class="lazy img-circle" :data-original="auth.user.avatar_url" style="width: 1.3rem; height: 1.3rem"> {{ auth.user.name }}
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" v-link="{ name: 'user_detail', params: { id: auth.id } }">查看个人主页</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" v-link="{ name: 'topic_detail', params: { id: 'help' }}">帮助</a>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#shortcut-cheat-sheet">键盘快捷键</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" v-link="'/account/settings'">设置</a>
            <a class="dropdown-item" v-link="'/account/logout'">退出登录</a>
          </div>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right" v-if="!auth.check()">
        <li class="nav-item">
          <a class="nav-link" v-link="'/account/register'">创建账号</a>
        </li>
        <li class="nav-item">
          <button class="btn btn-success" v-link="'/account/login'">登录</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery';
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
      counts: state => state.notifications.counts,
    },
  },
  data() {
    return {
    };
  },
  watch: {
    auth() {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    $('img.lazy').lazyload();
  },
};
</script>

<style scoped>
.navbar {
  padding-left: 1px;
  padding-right: 1px;
}
</style>
