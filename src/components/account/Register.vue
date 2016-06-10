<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="text-center">
          <h3>注册</h3>
        </div>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="text"
                name="username"
                placeholder="请输入用户名"
                v-model="username"
                v-validate:email="rules.username">
            </div>
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
            <div class="checkbox">
              <label>
                <input
                  type="checkbox"
                  v-validate:accepted="rules.accepted">
                  我已阅读并同意《<a href="#">用户隐私条款</a>》</input>
              </label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">注册</button>
            </div>
          </form>
        </validator>
        <div class="text-center">
          已有账号？<a v-link="'/account/login'">点此登录</a>
        </div>
      </div>
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
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    submit() {
      this.register(this.username, this.email, this.password);
    },
  },
};
</script>

<style scoped>
</style>
