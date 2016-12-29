<template>
  <div class="ui navbar borderless fixed menu">
    <div class="ui container">
      <div class="header item">
        <router-link to="/" style="height: 32px;">
          <img class="logo" src="../assets/ic_logo_dark.png">
        </router-link>
      </div>
      <div class="left menu">
        <router-link class="item" to="/" exact>首页</router-link>
        <router-link class="item" to="/topics">主题</router-link>
        <a class="item">精选集</a>
      </div>
      <div class="right menu" v-if="auth.check()">
        <router-link
          class="item"
          to="/notifications">
          通知 <div class="ui small teal label">0</div>
        </router-link>
        <div class="ui simple dropdown item">
          <img class="ui avatar image" v-lazy="auth.user.avatar_url">
          <span>{{ auth.user.name }}</span>
          <i class="dropdown icon"></i>
          <div class="ui vertical menu">
            <div class="item">
              <div class="ui icon input">
                <input type="text" placeholder="Search mail...">
                <i class="search icon"></i>
              </div>
            </div>
            <router-link class="item" :to="{ name: 'user_detail', params: { id: auth.id } }">查看个人主页</router-link>
            <router-link class="item" to="/topics/help">帮助</router-link>
            <router-link class="item" to="/account/settings">设置</router-link>
            <router-link class="item" to="/account/logout">退出登录</router-link>
          </div>
        </div>
      </div>
      <div class="right menu" v-if="!auth.check()">
        <router-link
          class="item"
          to="/account/register">
          创建账号
        </router-link>
        <div class="item">
          <router-link
            class="ui primary button"
            to="/account/login" >
            登录
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    auth: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.left.menu {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: 50px !important;
}
.left.menu .active {
  border-top: 4px solid #1B1C1D;
  // margin-top: -4px;
  padding-top: 8px;
  background-color: #FFFFFF;
}

// Mobile
@media (max-width: 768px) {
  .left.menu {
    display: none!important;
  }
}
// Tablet
@media (min-width: 768px) and (max-width: 991px) {
  .left.menu {
    margin-left: 20px !important;
  }
}
</style>
