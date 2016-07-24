<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" v-link="'/'">Daza</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <!-- <ul class="nav navbar-nav">
          <li><a v-link="'/posts'">帖子</a></li>
        </ul> -->
        <ul class="nav navbar-nav navbar-right" v-if="auth.check()">
          <li>
            <a v-link="'/notifications'">通知</a>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {{ auth.user.name }}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a v-link="'/account/profile'">我的资料</a></li>
              <li role="separator" class="divider"></li>
              <li><a v-link="'/account/logout'">退出登录</a></li>
            </ul>
          </li>
        </ul>
        <div class="navbar-form navbar-right" v-if="!auth.check()">
          <button class="btn btn-success" v-link="'/account/login'">登录</button>
          <button class="btn btn-success" v-link="'/account/register'">创建账号</button>
        </div>
      </div><!--/.navbar-collapse -->
    </div>
  </nav>
  <div style="height: 50px;"></div>
</template>

<script>
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style scoped>
</style>
