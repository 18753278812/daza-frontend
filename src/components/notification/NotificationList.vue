<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#announcement" role="tab">公告</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#remind" role="tab">提醒</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#messages" role="tab">私信</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="announcement" role="tabpanel">...</div>
          <div class="tab-pane" id="remind" role="tabpanel">...</div>
          <div class="tab-pane" id="messages" role="tabpanel">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';

export default {
  vuex: {
    getters: {
      auth,
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.nav-tabs {
    margin-bottom: 1rem;
}
</style>
