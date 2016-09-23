<template>
  <div class="modal fade" id="asset-manager-dialog" tabindex="-1" role="dialog" aria-labelledby="asset-manager-dialog-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="asset-manager-dialog-label">资源</h4>
        </div>
        <div class="modal-body">
          <p>
            ...
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="hideModal()">关闭</button>
          <button type="submit" class="btn btn-primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';
import { auth } from '../../vuex/getters';
// import { articleCreate, getUserTopics } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
    },
  },
  // props: {
  //   target_type: {
  //     type: String,
  //     required: true,
  //   },
  //   target_id: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      data: {
        assets: [],
      },
      rules: {
        mime_type: { required: true },
        size: { required: true },
        url: { required: true },
      },
      params: {
        mime_type: '',
        size: '',
        url: '',
      },
    };
  },
  ready() {
  },
  // methods: {
  //   submit() {
  //   },
  //   hideModal() {
  //     $('#asset-manager-dialog').modal('hide');
  //     this.params = {
  //       mime_type: '',
  //       size: '',
  //       url: '',
  //     };
  //   },
  // },
};
</script>

<style scoped>
</style>
