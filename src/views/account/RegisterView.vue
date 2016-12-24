<template>
  <div class="ui main container">
    <div class="ui centered grid">
      <div class="column">
        <h1 class="ui center aligned header">注册</h1>
        <form class="ui form" novalidate @submit.prevent="submit()">
          <div class="field">
            <input
              type="text"
              name="username"
              placeholder="请输入用户名"
              v-model="params.username">
          </div>
          <div class="field">
            <input
              type="email"
              name="email"
              placeholder="请输入邮箱"
              v-model="params.email">
          </div>
          <div class="field">
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              v-model="params.password">
          </div>
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox">
              <label>
                我已阅读并同意
                <router-link target="_blank" :to="{ name: 'article_detail', params: { 'slug': 'tos' } }">服务条款</router-link> 与
                <router-link target="_blank" :to="{ name: 'article_detail', params: { 'slug': 'privacy' } }">隐私政策</router-link>。
              </label>
            </div>
          </div>
          <div class="field">
            <button class="fluid ui primary button" type="submit">注册</button>
          </div>
          <div class="ui grid">
            <div class="center aligned sixteen wide column">
              已有账号？<router-link to="/account/login">点此登录</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  data() {
    return {
      rules: {
      },
      params: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('register', this.params).then(() => {
        setTimeout(() => {
          NProgress.done();
          this.$router.push('/');
        }, 300);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  max-width: 400px;
}
</style>
