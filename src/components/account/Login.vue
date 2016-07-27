<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="text-center">
          <h3>登录</h3>
        </div>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="email"
                name="email"
                placeholder="请输入邮箱"
                v-model="email"
                v-validate:email="rules.email">
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="请输入密码"
                v-model="password"
                v-validate:password="rules.password">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">登录</button>
            </div>
          </form>
          <div class="row">
            <div class="col-xs-6 col-sm-6">
              <a v-link="'/account/password_reset'">忘记密码？</a>
            </div>
            <div class="col-xs-6 col-sm-6 text-right">
              <a v-link="'/account/register'">创建账号</a>
            </div>
          </div>
        </validator>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';
import NProgress from 'nprogress';
import { login, logout } from '../../vuex/actions';

export default {
  vuex: {
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
      email: 'lijy91@foxmail.com',
      password: '123456',
    };
  },
  ready() {
    this.logout();
  },
  methods: {
    submit() {
      NProgress.start();
      this.login(this.email, this.password).then(() => {
        toastr.success('登录成功！');
        NProgress.done();
        this.$route.router.go('/');
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
};
</script>

<style scoped>
</style>
