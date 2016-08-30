<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" v-bind:class="{ disabled: onFirstPage }">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="element in elements" v-bind:class="{ active: element.page === pagination.current_page }">
        <a class="page-link" href="?page={{element.page}}">{{element.page}}</a>
      </li>
      <li class="page-item" v-bind:class="{ disabled: hasMorePages }">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  ready() {
  },
  computed: {
    elements() {
      let from = this.pagination.current_page;
      const to = this.pagination.last_page;

      const elements = [];
      while (from <= to) {
        elements.push({
          page: from,
        });
        from++;
      }
      return elements;
    },
    onFirstPage() {
      return (this.pagination.current_page === 1);
    },
    hasMorePages() {
      return (this.pagination.current_page !== this.pagination.last_page);
    },
  },
};
</script>

<style scoped>
</style>
