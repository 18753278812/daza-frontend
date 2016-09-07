<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <img class="card-img-top" :src="data.avatar_url" alt="Card image cap">
          <div class="card-block">
            <h4 class="card-title">{{data.name}}</h4>
            <p class="card-text">{{data.bio}}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { userShow } from '../../vuex/actions';
import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      userShow,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const userId = this.$route.params.id;
    NProgress.start();
    this.userShow(userId).then(data => {
      this.data = data;
      NProgress.done();
    });
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
