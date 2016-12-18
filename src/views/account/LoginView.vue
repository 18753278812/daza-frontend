<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">登录</h3>
        <div class="validator">
          <form novalidate @submit.prevent="submit()">
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
            <div class="form-group">
              <button
                class="btn btn-primary btn-block"
                type="submit">登录</button>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-xs-6">
            <router-link to="/account/password_reset">忘记密码？</router-link>
          </div>
          <div class="col-xs-6 text-xs-right">
            <router-link to="/account/register">创建账号</router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
    </div>
  </div>
</template>

<script>
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
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
