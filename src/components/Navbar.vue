<template>
  <nav class="navbar navbar-fixed-top navbar-light bg-white">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img alt="Brand" src="../assets/ic_logo_dark.png">
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/notifications" class="nav-link">
            通知 <span class="tag tag-pill tag-danger">0</span>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
            <img src="/static/images/placeholder_image.png" class="img-circle" style="width: 1.3rem; height: 1.3rem"> #
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item">查看个人主页</a>
            <div class="dropdown-divider"></div>
            <router-link to="/topics/help" class="dropdown-item">帮助</router-link>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item">设置</a>
            <router-link to="/account/logout" class="dropdown-item">退出登录</router-link>
          </div>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/account/register" class="nav-link">创建账号</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/account/login" class="btn btn-success">登录</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    };
  },
};
</script>

<style scoped>
</style>
