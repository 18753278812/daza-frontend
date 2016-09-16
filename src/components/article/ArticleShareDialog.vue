<template>
  <div class="modal fade" id="article-share-dialog" tabindex="-1" role="dialog" aria-labelledby="article-share-dialog-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="article-share-dialog-label">分享文章</h4>
        </div>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="modal-body">
              <div class="form-group">
                <label class="form-control-label">主题：</label>
                <select class="form-control">
                  <option>Default select</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-control-label">链接：</label>
                <input
                  class="form-control"
                  type="text"
                  name="link"
                  placeholder=""
                  v-model="params.link"
                  v-validate:email="rules.link">
              </div>
              <div class="form-group">
                <label class="form-control-label">标题：</label>
                <input
                  class="form-control"
                  type="text"
                  name="title"
                  placeholder=""
                  v-model="params.title"
                  v-validate:email="rules.title">
              </div>
              <div class="form-group">
                <label class="form-control-label">摘要：</label>
                <textarea
                  id="summary-input"
                  class="form-control"
                  rows="3"
                  name="summary"
                  placeholder=""
                  v-model="params.summary"
                  v-validate:email="rules.summary"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
              <button type="submit" class="btn btn-primary" :disabled="!$validation.valid">确定</button>
            </div>
          </form>
        </validator>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { articleCreate } from '../../vuex/actions';
import $ from 'jquery';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      articleCreate,
    },
  },
  data() {
    return {
      rules: {
        title: { required: true },
        link: { required: true },
        summary: { required: true, minlength: 15 },
      },
      params: {
        topic_id: 1,
        title: '',
        summary: '',
        content: 'hi',
      },
    };
  },
  ready() {
  },
  methods: {
    submit() {
      this.articleCreate(this.params).then((data) => {
        if (data) {
          $('#article-share-dialog').modal('hide');
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
