<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-2 col-xs-4">
            <img class="img-rounded" v-lazy="data.image_url" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-8 col-xs-4" style="padding-left: 0;">
            <h3>{{ data.name }}</h3>
            <small class="text-muted">由 <a v-link="{ name: 'user_detail', params: { id: data.user.id } }">{{ data.user.name }}</a> 维护</small>
            <p>{{ data.description }}</p>
          </div>
          <div class="col-sm-2 col-xs-4 text-sm-right">
            <form @submit.prevent="subscribe(data.id)">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.subscribed }">&nbsp;订阅 ({{ data.subscriber_count }})&nbsp;</button>
            </form>
          </div>
        </div>
        <hr>
        <p>
          ...
        </p>
      </div>
      <div class="col-sm-4" style="display: none;">
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
import { topicShow, topicSubscribe } from '../../vuex/actions';
import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      topicShow,
      topicSubscribe,
    },
  },
  data() {
    return {
      data: {},
    };
  },
  ready() {
    const topicId = this.$route.params.id;
    NProgress.start();
    this.topicShow(topicId).then(data => {
      this.data = data;
      NProgress.done();
    });
  },
  methods: {
    subscribe(id) {
      if (this.data.subscribed) {
        return;
      }
      this.topicSubscribe(id).then(() => {
        this.data.subscriber_count += 1;
        this.data.subscribed = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
