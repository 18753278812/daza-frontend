<template>
  <div class="ui pagination menu" v-if="pagination">
    <a
      class="item"
      v-bind:class="{ disabled: currentPage === 1 }"
      v-on:click="changePage(prevPage)">
      Prev
    </a>
    <a
      class="item"
      v-for="element in elements"
      v-bind:class="{ active: element.page === currentPage }"
      v-on:click="changePage(element.page)">
      {{ element.page }}
    </a>
    <a
      class="item"
      v-bind:class="{ disabled: currentPage === lastPage }"
      v-on:click="changePage(nextPage)">
      Next
    </a>
  </div>
</template>

<script>
export default {
  name: 'pagination',
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
    elements() {
      const offset = 2;
      let from = this.currentPage - offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + (offset * 2);
      if (to >= this.lastPage) {
        to = this.lastPage;
      }
      const elements = [];
      while (from <= to) {
        elements.push({
          page: from,
        });
        from += 1;
      }
      return elements;
    },
    prevPage() {
      return (this.pagination.current_page - 1);
    },
    nextPage() {
      return (this.pagination.current_page + 1);
    },
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
    };
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.lastPage) {
        return;
      }
      this.callback(page);
    },
  },
};
</script>

<style lang="scss" scoped>
// Mobile
@media (max-width: 768px) {
  .pagination.menu .item {
    padding-left: 13px;
    padding-right: 13px;
  }
}
</style>
