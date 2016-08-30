<template>
  <div class="container">
    <h4>{{ data.title }}</h4>
    <hr>
    <p>{{{ data.content }}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const eventId = this.$route.params.id;

    this.$http.get(`v1/events/${eventId}?`).then((response) => {
      this.data = response.data.data;
    }, () => { });
  },
};
</script>

<style scoped>
</style>
