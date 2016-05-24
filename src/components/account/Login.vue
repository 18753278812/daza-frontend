<template>
  <div class="ui grid">
    <div class="five wide column"></div>
    <div class="six wide column">
      <h2 class="ui header">
        <div class="content">
          登录
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="email" name="email" placeholder="请输入邮箱">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="请输入密码">
            </div>
          </div>
          <button  type="submit" class="fluid ui primary button">登录</button>
        </div>

        <div class="ui error message"></div>

      </form>
      <div class="ui two column grid">
        <div class="column">
          <a v-link="'/account/password_reset'">忘记密码</a>
        </div>
        <div class="column right aligned">
          <a v-link="'/account/register'">注册账户</a>
        </div>
      </div>
    <div class="five wide column"></div>
  </div>
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
