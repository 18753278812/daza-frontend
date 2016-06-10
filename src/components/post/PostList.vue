<template>
  <a v-link="'/posts/create'">New</a>
  <div class="ui divided items">
    <div class="item" v-for="data in results">
      <div class="image">

      </div>
      <div class="content">
        <a class="header" v-link="{ name: 'post_detail', params: { id: data.id } }">{{ data.title }}</a>
        <div class="meta">
          <span class="cinema">Union Square 14</span>
        </div>
        <div class="description">
          <p></p>
        </div>
        <div class="extra">
          <div class="ui label">IMAX</div>
          <div class="ui label"><i class="globe icon"></i> Additional Languages</div>
        </div>
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
