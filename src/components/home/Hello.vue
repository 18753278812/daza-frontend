<template>
  <div class="container">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <a v-link="'account/login'">Login</a>
      <a v-link="'account/register'">Register</a>
      <a v-link="'posts'">Posts</a>
      <a v-link="'groups'">Groups</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello World!',
    };
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
