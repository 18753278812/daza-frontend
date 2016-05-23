<template>
  <a v-link="'/posts/create'">New</a>
  <div class="row" v-for="data in results">
    <div class="col-md-10">
      <div class="vote-actions">
        <a href="#">
          <i class="fa fa-chevron-up"> </i>
        </a>
        <div>34</div>
        <a href="#">
          <i class="fa fa-chevron-down"> </i>
        </a>
      </div>
      <a class="vote-title" v-link="{ name: 'post_detail', params: { id: data.id } }">
        {{ data.title }}
      </a>
      <div class="vote-info">
        <i class="fa fa-comments-o"></i> <a href="#">Comments (21)</a>
        <i class="fa fa-clock-o"></i> <a href="#">11 Hours ago</a>
        <i class="fa fa-user"></i> <a href="#">Johnathan Morgan</a>
      </div>
    </div>
    <div class="col-md-2 ">
      <div class="vote-icon">
        <i class="fa fa-tumblr"> </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [],
    };
  },
  ready() {
    this.$http.get('v1/posts').then((response) => {
      this.results = response.data.data;
      console.log(response.data.data);
    }, (response) => {
      // error callback
      console.log(response);
    });
  },
};
</script>

<style scoped>
</style>
