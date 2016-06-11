<template>
  <div class="container">
    <div class="hello">
      <h1>{{ msg }}</h1>
      <a v-link="'account/login'">Login</a>
      <a v-link="'account/register'">Register</a>
      <a v-link="'users'">users</a>
      <a v-link="'categories'">categories</a>
      <a v-link="'tags'">tags</a>
      <a v-link="'groups'">groups</a>
      <a v-link="'tweets'">tweets</a>
      <a v-link="'posts'">posts</a>
      <a v-link="'articles'">articles</a>
      <a v-link="'events'">events</a>
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
