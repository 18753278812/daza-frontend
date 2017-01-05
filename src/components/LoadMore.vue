<template>
  <div class="ui basic center aligned segment" v-if="pagination">
    <button class="ui basic button" v-bind:class="{ loading: isLoading }" v-on:click="submit">{{ hasMore ? '点击加载更多' : '没有更多数据'}}</button>
  </div>
</template>

<script>
export default {
  name: 'loadmore',
  props: {
    pagination: {
      type: Object,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  computed: {
    currentPage() {
      if (!this.pagination) {
        return 0;
      }
      return this.pagination.current_page;
    },
    lastPage() {
      if (!this.pagination) {
        return 0;
      }
      return this.pagination.last_page;
    },
    hasMore() {
      if (!this.pagination) {
        return false;
      }
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

<style lang="scss" scoped>
.segment {
  margin-top: 0px;
}
</style>
