<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" v-link="'/'">FLOW</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <img src="../../assets/logo.png" class="avatar img-circle">
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a v-link="'/account/profile'">我的资料</a></li>
              <li role="separator" class="divider"></li>
              <li><a v-link="'/account/login'">退出登录</a></li>
            </ul>
          </li>
        </ul>
      </div><!--/.navbar-collapse -->
    </div>
  </nav>
  <div style="height:50px;"></div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.avatar {
  width: 25px;
  height: 25px;
}
</style>
