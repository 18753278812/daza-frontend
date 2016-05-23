<template>
  <form>
    <h2>登录</h2>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="请输入邮箱">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="请输入密码">
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">登录</button>
    </div>
    <div class="form-group">
      <div class="col-sm-6">
        <a class="btn btn-link" v-link="'/account/password_reset'">忘记密码</a>
      </div>
      <div class="col-sm-6">
        <a class="btn btn-link pull-right" v-link="'/account/register'">注册账户</a>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: 'lijy91@foxmail.com',
      password: '123456',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
