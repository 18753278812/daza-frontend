<template>
  <div class="ui main container">
    <div class="three column ui centered grid">
      <div class="column">
        <h1 class="ui center aligned header">登录</h1>
        <form class="ui form">
          <div class="field">
            <input type="text" name="first-name" placeholder="请输入邮箱">
          </div>
          <div class="field">
            <input type="text" name="last-name" placeholder="请输入密码">
          </div>
          <button class="fluid ui primary button" type="submit">登录</button>
        </form>
        <div class="row">
          <div class="col-xs-6">
            <router-link to="/account/password_forgot">忘记密码？</router-link>
          </div>
          <div class="col-xs-6 text-xs-right">
            <router-link to="/account/register">创建账号</router-link>
          </div>
        </div>
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
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('login', this.params).then(() => {
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
</style>
