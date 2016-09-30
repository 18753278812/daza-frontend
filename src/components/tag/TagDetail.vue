<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-12">
            <h3>{{ data.tag.name }}</h3>
            <p>{{ data.tag.description }}
          </div>
        </div>
      </div>
      <div class="col-sm-12" style="padding-top: 15px;">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#latest" role="tab">最新文章</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="latest" role="tabpanel">
            <tag-detail-latest></tag-detail-latest>
          </div>
          <div class="tab-pane" id="profile" role="tabpanel">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import TagDetailLatest from './TagDetailLatest';
import { auth } from '../../vuex/getters';
import { tagShow } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      tagShow,
    },
  },
  components: {
    TagDetailLatest,
  },
  data() {
    return {
      data: {
        tag: {},
      },
    };
  },
  ready() {
    const tagName = this.$route.params.name;
    NProgress.start();
    this.tagShow(tagName).then(data => {
      this.data.tag = data.data;
      NProgress.done();
    });
  },
};
</script>

<style lang="scss" scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
