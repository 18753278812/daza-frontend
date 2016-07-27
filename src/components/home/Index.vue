<template>
  <div class="container">
    <div class="media" v-for="data in results">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="{{ data.image_url }}" alt="...">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
        </h4>
        {{ data.summary }}
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
    this.$http.get('v1/articles').then((response) => {
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
.media img {
  width: 160px;
  height: 90px;
}
</style>
