<template>
  <div>
    <button class="fluid ui basic button" v-bind:class="{ loading: isLoading }" v-on:click="submit">{{ hasMore ? '点击加载更多' : '没有更多数据'}}</button>
  </div>
</template>

<script>
export default {
  name: 'loadmore',
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  computed: {
    currentPage() {
      return this.pagination.current_page;
    },
    lastPage() {
      return this.pagination.last_page;
    },
    hasMore() {
      return this.lastPage > this.currentPage;
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    pagination: 'watchPagination',
  },
  methods: {
    watchPagination() {
      this.isLoading = false;
    },
    submit() {
      if (!this.hasMore && !this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.callback(this.currentPage + 1);
    },
  },
};
</script>

<style scoped>
</style>
