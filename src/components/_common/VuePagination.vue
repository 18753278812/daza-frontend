<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" v-bind:class="{ disabled: onFirstPage }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          v-on:click.prevent="changePage(prevPage)">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="element in elements" v-bind:class="{ active: element.page === pagination.current_page }">
        <a
          class="page-link"
          href="#"
          v-on:click.prevent="changePage(element.page)">{{element.page}}</a>
      </li>
      <li class="page-item" v-bind:class="{ disabled: !hasMorePages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          v-on:click.prevent="changePage(nextPage)">
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
    callback: {
      type: Function,
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
      const offset = 4;
      let from = this.pagination.current_page - offset;
      if (from < 1) {
        from = 1;
      }

      let to = from + (offset * 2);
      if (to >= this.pagination.last_page) {
        to = this.pagination.last_page;
      }

      const elements = [];
      while (from <= to) {
        elements.push({
          page: from,
        });
        from++;
      }
      return elements;
    },
    prevPage() {
      return (this.pagination.current_page - 1);
    },
    nextPage() {
      return (this.pagination.current_page + 1);
    },
    onFirstPage() {
      return (this.pagination.current_page === 1);
    },
    hasMorePages() {
      return (this.pagination.current_page !== this.pagination.last_page);
    },
  },
  methods: {
    changePage(page) {
      // console.log(page);
      // this.$set('pagination.current_page', page);
      this.callback(page);
    },
  },
};
</script>

<style scoped>
</style>
