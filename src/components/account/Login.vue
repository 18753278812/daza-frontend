<template>
  <div class="ui login grid">
    <div class="column">
      <h2 class="ui header">
        <div class="content">
          登录
        </div>
      </h2>
      <validator name="validation">
        <form class="ui large form" novalidate>
          <div class="ui stacked">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" name="email" placeholder="请输入邮箱"
                  v-validate:email="{ required: true, email: true }">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="请输入密码"
                  v-validate:password="{ required: true, minlength: 6, maxlength: 32 }">
              </div>
            </div>
            <button  type="submit" class="fluid ui primary button {{ $validation.valid ? '' : 'disabled'}}">登录</button>
          </div>

          <div class="ui error message">
            <div class="header">Action Forbidden</div>
            <p>You can only sign up for an account once with a given e-mail address.</p>
          </div>

        </form>
      </validator>
      <div class="ui two column grid">
        <div class="column">
          <a v-link="'/account/password_reset'">忘记密码</a>
        </div>
        <div class="column right aligned">
          <a v-link="'/account/register'">注册账户</a>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
