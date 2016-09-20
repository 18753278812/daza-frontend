<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-2 col-xs-4">
            <img class="lazy img-rounded" :data-original="data.user.avatar_url" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-10 col-xs-8" style="padding-left: 0;">
            <div class="row">
              <div class="col-sm-9 col-xs-6">
                <h3>{{ data.user.name }}</h3>
              </div>
              <div class="col-sm-3 col-xs-6 text-xs-right" v-if="data.user.id !== auth.user.id">
                <form @submit.prevent="follow()">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    type="submit"
                    :class="{ 'active': data.user.followed }">关注 ({{ data.user.followers_count }})</button>
                </form>
              </div>
              <div class="col-sm-3 col-xs-6 text-xs-right" v-if="data.user.id === auth.user.id">
                <button
                  class="btn btn-sm btn-outline-primary"
                  v-link="'/account/settings'"
                  >编辑资料</button>
              </div>
            </div>
            <ul class="list-unstyled">
              <li><small class="text-muted">来自 {{ data.user.city }}，加入于  {{ data.user.created_at | moment }}</small></li>
              <li><small class="text-muted" v-if="data.user.website">主页：<a :href="data.user.website">{{ data.user.website }}</a></small></li>
              <li><p>{{ data.user.bio }}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-sm-12" style="padding-top: 15px;">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#home" role="tab">维护的主题</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#messages" role="tab">订阅的主题</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#profile" role="tab">赞过的文章</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="home" role="tabpanel">...</div>
          <div class="tab-pane" id="profile" role="tabpanel">...</div>
          <div class="tab-pane" id="messages" role="tabpanel">...</div>
          <div class="tab-pane" id="settings" role="tabpanel">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { userShow, userRelationship } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      userShow,
      userRelationship,
    },
  },
  data() {
    return {
      data: {
        user: {},
      },
    };
  },
  watch: {
    'data.user': () => {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    $('img.lazy').lazyload();
    const userId = this.$route.params.id;
    NProgress.start();
    this.userShow(userId).then(data => {
      this.data.user = data;
      NProgress.done();
    });
  },
  methods: {
    follow() {
      const user = this.data.user;
      if (user.followed) {
        return;
      }
      this.userRelationship(user.id, 'follow').then(() => {
        user.followers_count = user.followers_count + 1;
        user.followed = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
