<template>
  <div class="ui fixed inverted menu">
    <div class="ui container">
      <a class="header item" href="javascript:void(0);">
        <img class="logo" src="../../assets/logo.png">
      </a>
      <a class="item" v-link="'/'">首页</a>
      <a class="item" v-link="'/posts'">帖子</a>
      <a class="item" v-link="'/articles'">文章</a>
      <div class="right menu">
        <div class="item">
          <a class="ui button" v-link="'/account/login'">登录</a>
        </div>
        <div class="item">
          <a class="ui primary button" v-link="'/account/register'">注册</a>
        </div>
        <a href="#" class="item">通知</a>
        <div class="ui simple dropdown item">
          <a href="#"> 痕迹 <i class="dropdown icon"></i></a>
          <div class="menu">
            <a class="item" href="#">Link Item</a>
            <a class="item" href="#">Link Item</a>
            <div class="divider"></div>
            <div class="header">Header Item</div>
            <div class="item">
              <i class="dropdown icon"></i> Sub Menu
              <div class="menu">
                <a class="item" href="#">Link Item</a>
                <a class="item" href="#">Link Item</a>
              </div>
            </div>
            <a class="item" v-link="'/'">退出</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello World!',
    };
  },
};
</script>

<style scoped>
</style>
