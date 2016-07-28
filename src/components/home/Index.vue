<template>
  <div class="container">
    <div class="row">
      <div class="col-md-9">
        <div class="media" v-for="data in results">
          <div class="media-left" v-if="data.image_url">
            <a v-link="{ name: 'article_detail', params: { id: data.id } }">
              <img class="media-object" src="{{ data.image_url }}">
            </a>
          </div>
          <div class="media-body">
            <h5 class="media-heading">
              <a v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
            </h5>
            <p>{{ data.summary }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">.col-md-6</div>
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
  width: 140px;
  height: 100px;
}
</style>
