<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">登录</h3>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="请输入邮箱"
                v-model="params.email"
                v-validate:email="rules.email">
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="params.password"
                v-validate:password="rules.password">
            </div>
            <div class="form-group">
              <button
                class="btn btn-primary btn-block"
                type="submit"
                :disabled="!$validation.valid">登录</button>
            </div>
          </form>
        </validator>
        <div class="row">
          <div class="col-xs-6">
            <a v-link="'/account/password_reset'">忘记密码？</a>
          </div>
          <div class="col-xs-6 text-xs-right">
            <a v-link="'/account/register'">创建账号</a>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { login, logout } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      login,
      logout,
    },
  },
  data() {
    return {
      rules: {
        email: { required: true, email: true },
        password: { required: true, minlength: 6, maxlength: 32 },
      },
      params: {
        email: '',
        password: '',
      },
    };
  },
  ready() {
    this.logout();
  },
  methods: {
    submit() {
      // 用户登录
      this.login(this.params).then(() => {
        this.$route.router.go('/');
      });
    },
  },
};
</script>

<style scoped>
</style>
