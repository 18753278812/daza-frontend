<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <img class="img-rounded" style="width: 100%; height: auto; margin-bottom: 12px;" :src="data.avatar_url">
        <ul class="list-unstyled">
          <li><h3>{{data.name}}</h3></li>
          <li><small class="text-muted">{{data.username}}</small></li>
          <li>{{data.bio}}</li>
        </ul>
        <hr>
        <ul class="list-unstyled">
          <li>{{data.city}}</li>
          <li><a href="mailto:{{data.email}}">{{data.email}}<a></li>
          <li><a :href="data.website">{{data.website}}</a></li>
          <li>加入于 {{data.created_at}}</li>
        </ul>
        <hr>
        <div class="row">
          <div class="col-sm-4">
            <h2 class="text-xs-center">55</h2>
            <div class="text-muted text-xs-center">文章</div>
          </div>
          <div class="col-sm-4">
            <h2 class="text-xs-center">0</h2>
            <div class="text-muted text-xs-center">粉丝</div>
          </div>
          <div class="col-sm-4">
            <h2 class="text-xs-center">0</h2>
            <div class="text-muted text-xs-center">关注</div>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
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
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#messages" role="tab">收藏的文章</a>
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
