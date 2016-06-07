<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="text-center">
          <h3>登录</h3>
        </div>
        <validator name="validation">
          <form novalidate>
            <div class="form-group">
              <input class="form-control" type="email" name="email" placeholder="请输入邮箱" v-validate:email="rules.email">
            </div>
            <div class="form-group">
              <input class="form-control" type="password" name="password" placeholder="请输入密码" v-validate:password="rules.password">
            </div>
            <button type="submit" class="btn btn-primary btn-block" :disabled="!$validation.valid">登录</button>
          </form>
          <div class="row">
            <div class="col-xs-6 col-sm-6">
              <a v-link="'/account/password_reset'">忘记密码</a>
            </div>
            <div class="col-xs-6 col-sm-6 text-right">
              <a v-link="'/account/register'">注册账户</a>
            </div>
          </div>
        </validator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        email: { required: true },
        password: { required: true, minlength: 6, maxlength: 32 },
      },
    };
  },
  ready() {
    this.$http.post('v1/account/logout').then(() => { });
    // const params = {
    //   email: this.email,
    //   password: this.password,
    // };
    // this.$http.post('v1/account/login', params).then((response) => {
    //   this.results = response.data.data;
    //   console.log(response.data.data);
    // }, (response) => {
    //   // error callback
    //   console.log(response);
    // });
  },
};
</script>

<style scoped>
.login.grid {
  max-width: 350px;
}
</style>
