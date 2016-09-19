<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-2 col-xs-4">
            <img class="img-rounded" v-lazy="data.topic.image_url" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-8 col-xs-4" style="padding-left: 0;">
            <ul class="list-unstyled">
              <li><h3 style="display: inline-block">{{ data.topic.name }}</h3>&nbsp;<span class="tag tag-default" v-if="data.topic.type === 'original'">原创</span></li>
              <li><small class="text-muted" v-if="data.topic.website">主页：<a :href="data.topic.website">{{ data.topic.website }}</a></small></li>
              <li><small class="text-muted">由 <a v-link="{ name: 'user_detail', params: { id: data.topic.user.id } }">{{ data.topic.user.name }}</a> 维护</small></li>
              <li><p>{{ data.topic.description }}</p></li>
            </ul>
          </div>
          <div class="col-sm-2 col-xs-4 text-sm-right">
            <form @submit.prevent="subscribe(data.topic.id)">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.topic.subscribed }">&nbsp;订阅 ({{ data.topic.subscriber_count }})&nbsp;</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-sm-12" style="padding-top: 15px;">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home" role="tab">最新文章</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#messages" role="tab">最热文章</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#profile" role="tab">订阅者</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="home" role="tabpanel">...</div>
          <div class="tab-pane" id="profile" role="tabpanel">...</div>
          <div class="tab-pane" id="messages" role="tabpanel">...</div>
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
      data: {
        topic: {},
      },
    };
  },
  ready() {
    const topicId = this.$route.params.id;
    NProgress.start();
    this.topicShow(topicId).then(data => {
      this.data.topic = data;
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
