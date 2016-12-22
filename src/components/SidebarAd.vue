<template>
  <div class="row" v-if="article !== null">
    <div class="col-xs-12" v-if="article !== null">
      <div class="card">
        <div class="image-container">
          <a :href="article.link" target="_blank">
            <img class="card-img-top" v-bind:src="article.image_url | thumbnail">
          </a>
        </div>
        <div class="card-block">
          <p class="card-text">{{ article.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar-ad',
  props: {
    article: {
      type: Object,
    },
  },
};
</script>

<style scoped>
</style>
