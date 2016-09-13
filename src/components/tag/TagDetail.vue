<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-12">
            <h3>{{ data.name }}</h3>
          </div>
        </div>
        <hr>
        <p>
          ...
        </p>
      </div>
      <div class="col-sm-4">
        <div class="row">
          <div class="col-xs-6">
            <h5>TITLE</h5>
          </div>
          <div class="col-xs-6 text-xs-right">

          </div>
          <div class="col-xs-12">
            <p>
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { tagShow } from '../../vuex/actions';
import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      tagShow,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const tagName = this.$route.params.name;
    NProgress.start();
    this.tagShow(tagName).then(data => {
      this.data = data;
      NProgress.done();
    });
  },
};
</script>

<style scoped>
</style>
