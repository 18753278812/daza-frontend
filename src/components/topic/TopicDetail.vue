<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-2 col-xs-4">
            <img class="lazy img-rounded" :data-original="data.topic.image_url" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-10 col-xs-8" style="padding-left: 0;">
            <div class="row">
              <div class="col-sm-9 col-xs-8">
                <h3 style="display: inline-block;">{{ data.topic.name }}</h3>&nbsp;<span class="tag tag-default" v-if="data.topic.type === 'original'">原创</span>
              </div>
              <div class="col-sm-3 col-xs-4 text-xs-right" v-if="data.topic.user_id !== auth.user.id">
                <form @submit.prevent="subscribe(data.topic.id)">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    type="submit"
                    :class="{ 'active': data.topic.subscribed }">&nbsp;订阅 ({{ data.topic.subscriber_count }})&nbsp;</button>
                </form>
              </div>
              <div class="col-sm-3 col-xs-4 text-xs-right" v-if="data.topic.user_id === auth.user.id">
                <button
                  class="btn btn-sm btn-outline-primary"
                  v-link="{ name: 'topic_edit', params: { id: data.topic.id } }"
                  >编辑</button>
              </div>
            </div>
            <ul class="list-unstyled">
              <li><small class="text-muted" v-if="data.topic.website">主页：<a :href="data.topic.website">{{ data.topic.website }}</a></small></li>
              <li><small class="text-muted">由 <a v-link="{ name: 'user_detail', params: { id: data.topic.user.id } }">{{ data.topic.user.name }}</a> 维护</small></li>
              <li><p>{{ data.topic.description }}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-12" style="padding-top: 15px;">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#latest" role="tab">最新文章</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#subscribers" role="tab">订阅者</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="latest" role="tabpanel">
            <topic-detail-latest></topic-detail-latest>
          </div>
          <div class="tab-pane" id="subscribers" role="tabpanel">
            <topic-detail-subscribers></topic-detail-subscribers>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import TopicDetailLatest from './TopicDetailLatest';
import TopicDetailSubscribers from './TopicDetailSubscribers';
import { auth } from '../../vuex/getters';
import { topicShow, topicSubscribe } from '../../vuex/actions';

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
        topic: {
          user: {
            id: 0,
            name: '',
          },
        },
      },
    };
  },
  watch: {
    'data.topic': () => {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    $('img.lazy').lazyload();
    const topicId = this.$route.params.id;
    NProgress.start();
    this.topicShow(topicId).then(data => {
      this.data.topic = data.data;
      NProgress.done();
    });
  },
  methods: {
    subscribe(id) {
      const topic = this.data.topic;
      if (topic.subscribed) {
        return;
      }
      this.topicSubscribe(id).then(() => {
        topic.subscriber_count += 1;
        topic.subscribed = true;
      });
    },
  },
  components: {
    TopicDetailLatest,
    TopicDetailSubscribers,
  },
};
</script>

<style lang="scss" scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
