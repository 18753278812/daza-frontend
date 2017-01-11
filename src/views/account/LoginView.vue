<template>
  <div class="ui main container">
    <div class="ui centered grid">
      <div class="column">
        <h1 class="ui center aligned header">登录</h1>
        <form class="ui form error" novalidate @submit.prevent="submit()">
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
          <div class="ui error message" v-if="failure">
            <div class="header">{{failure.message}}</div>
            <ul class="list">
              <li v-for="error in failure.errors">{{error.message}}</li>
            </ul>
          </div>
          <div class="field">
            <button class="fluid ui primary button" type="submit">登录</button>
          </div>
          <div class="ui grid">
            <div class="left aligned eight wide column">
              <router-link to="/account/password_forgot">忘记密码？</router-link>
            </div>
            <div class="right aligned eight wide column">
              <router-link to="/account/register">创建账号</router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const NProgress = global.NProgress;

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
  computed: mapState({
    success: state => state.account.login.success,
    failure: state => state.account.login.failure,
  }),
  methods: {
    submit() {
      NProgress.start();
      this.$store.dispatch('accountLoginSubmit', this.params);
    },
    successWatcher(val, oldVal) {
      if (val && !oldVal) {
        NProgress.done();
        const redirectUrl = this.$route.query.redirect_url || '/';
        this.$router.push(redirectUrl);
      }
    },
    failureWatcher() {
      NProgress.done();
    },
  },
  watch: {
    success: 'successWatcher',
    failure: 'failureWatcher',
  },
  beforeCreate() {
    this.$store.dispatch('accountLoginInit');
  },
};
</script>

<style lang="scss" scoped>
.column {
  max-width: 400px;
}
</style>
