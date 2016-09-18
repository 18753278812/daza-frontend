<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">注册</h3>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="username"
                placeholder="请输入用户名"
                v-model="params.username"
                v-validate:username="rules.username">
            </div>
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
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-validate:accepted="rules.accepted">
                  我已阅读并同意<a v-link="{ name: 'article_detail', params: { 'id': 'tos' } }">服务条款</a>与<a v-link="{ name: 'article_detail', params: { 'id': 'privacy' } }">隐私政策</a>。</input>
              </label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">注册</button>
            </div>
          </form>
        </validator>
        <div class="text-xs-center">
          已有账号？<a v-link="'/account/login'">点此登录</a>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import { register } from '../../vuex/actions';

export default {
  vuex: {
    actions: {
      register,
    },
  },
  data() {
    return {
      rules: {
        username: { required: true },
        email: { required: true, email: true },
        password: { required: true, minlength: 6, maxlength: 32 },
        accepted: { required: true },
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
      this.register(this.params).then(data => {
        if (data) {
          this.$route.router.go('/');
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
