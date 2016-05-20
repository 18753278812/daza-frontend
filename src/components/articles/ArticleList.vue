<template>
  <div class="ui items">
    <div class="item" v-for="data in results">
      <div class="ui tiny image">

      </div>
      <div class="middle aligned content">
        <a class="header" v-link="{ name: 'article_detail', params: { id: data.id } }">{{ data.title }}</a>
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
</style>
