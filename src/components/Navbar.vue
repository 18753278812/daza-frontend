<template>
  <div class="ui small borderless fixed menu">
    <div class="ui container">
      <div class="header item">
        <router-link to="/" style="height: 32px;">
          <img class="logo" src="../assets/ic_logo_dark.png">
        </router-link>
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

<style scoped>
</style>
