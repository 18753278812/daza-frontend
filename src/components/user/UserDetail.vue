<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-2 col-xs-4">
            <img class="img-rounded" v-lazy="data.user.image_url" style="width: 100%; height: auto;">
          </div>
          <div class="col-sm-8 col-xs-8" style="padding-left: 0;">
            <ul class="list-unstyled">
              <li><h3 style="display: inline-block">{{ data.user.name }}</h3>&nbsp;<span class="tag tag-default">{{data.user.username}}</span></li>
              <li><small class="text-muted">来自 {{data.user.city}}，加入于  {{data.user.created_at}}</small></li>
              <li><small class="text-muted" v-if="data.user.website">主页：<a :href="data.user.website">{{ data.user.website }}</a></small></li>
              <li><p>{{ data.user.bio }}</p></li>
            </ul>
          </div>
          <div class="col-sm-2 col-xs-12 text-xs-right">
            <form @submit.prevent="subscribe(data.topic.id)">
              <button
                class="btn btn-sm btn-outline-primary"
                type="submit"
                :class="{ 'active': data.user.followed }">&nbsp;关注 ({{ data.user.subscriber_count }})&nbsp;</button>
            </form>
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
      data: {
        user: {},
      },
    };
  },
  ready() {
    const userId = this.$route.params.id;
    NProgress.start();
    this.userShow(userId).then(data => {
      this.data.user = data;
      NProgress.done();
    });
  },
};
</script>

<style scoped>
</style>
