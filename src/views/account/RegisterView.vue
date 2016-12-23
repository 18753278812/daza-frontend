<template>
  <div class="ui main container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">注册</h3>
        <div class="validator">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="username"
                placeholder="请输入用户名"
                v-model="params.username">
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="请输入邮箱"
                v-model="params.email">
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="params.password">
            </div>
            <div class="checkbox">
              <label>
                <input
                  type="checkbox">
                  我已阅读并同意
                  <router-link target="_blank" :to="{ name: 'article_detail', params: { 'slug': 'tos' } }">服务条款</router-link> 与
                  <router-link target="_blank" :to="{ name: 'article_detail', params: { 'slug': 'privacy' } }">隐私政策</router-link>。
                </input>
              </label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">注册</button>
            </div>
          </form>
        </div>
        <div class="text-xs-center">
          已有账号？<router-link to="/account/login">点此登录</router-link>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
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
</style>
