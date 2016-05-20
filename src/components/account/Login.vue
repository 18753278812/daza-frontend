<template>
  <form class="ui form">
    <div class="field">
      <label>邮箱</label>
      <input v-model="email" type="text" name="email" placeholder="">
    </div>
    <div class="field">
      <label>密码</label>
      <input v-model="password" type="password" name="password" placeholder="">
    </div>
    <button class="ui button" type="submit">Submit</button>
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
    const params = {
      email: this.email,
      password: this.password,
    };
    this.$http.post('v1/account/login', params).then((response) => {
      this.results = response.data.data;
      console.log(response.data.data);
    }, (response) => {
      // error callback
      console.log(response);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
