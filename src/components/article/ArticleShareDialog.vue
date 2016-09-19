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
                <select
                  id="select2-topic"
                  class="form-control"
                  style="width: 100%"
                  name="topic_id"
                  v-model="params.topic_id"
                  v-select2="params.topic_id"
                  :options="{ }"
                  v-validate:topic_id="rules.topic_id">
                  <option></option>
                  <option v-for="topic in data.topics" :value="topic.id">{{ topic.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-control-label">链接：</label>
                <input
                  class="form-control"
                  type="text"
                  name="link"
                  placeholder="e.g. http://daza.io/articles/example"
                  v-model="params.link"
                  v-validate:link="rules.link">
              </div>
              <div class="form-group">
                <label class="form-control-label">标题：</label>
                <input
                  class="form-control"
                  type="text"
                  name="title"
                  placeholder="请填写不小于6个字符的标题。"
                  v-model="params.title"
                  v-validate:title="rules.title">
              </div>
              <div class="form-group">
                <label class="form-control-label">摘要：</label>
                <textarea
                  id="summary-input"
                  class="form-control"
                  rows="3"
                  name="summary"
                  placeholder="请填写不小于16个字符的摘要。"
                  v-model="params.summary"
                  v-validate:summary="rules.summary"></textarea>
              </div>
              <div class="form-group">
                <label class="form-control-label">标签：</label>
                <select
                  id="select2-tags"
                  class="form-control"
                  style="width: 100%"
                  name="tags"
                  multiple="multiple"
                  v-select2="params.tags"
                  :options="{ tags: true }">
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="hideModal()">关闭</button>
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
import { articleCreate, getUserTopics } from '../../vuex/actions';
import $ from 'jquery';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getUserTopics,
      articleCreate,
    },
  },
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: {
        topics: [],
      },
      rules: {
        topic_id: { required: true },
        title: { required: true, minlength: 6 },
        link: { required: true, url: true },
        summary: { required: true, minlength: 16 },
      },
      params: {
        topic_id: '',
        type: 'share',
        link: '',
        title: '',
        summary: '',
        tags: '',
      },
    };
  },
  watch: {
    link(val) {
      this.params.link = val;
    },
  },
  ready() {
    // 直接使用该方法是为解决modal模式下搜索框无效问题
    $('#select2-topic').select2({
      placeholder: '选择一个主题',
      dropdownParent: $('#article-share-dialog'),
    });
    this.getUserTopics(this.auth.id).then((data) => {
      if (data) {
        this.data.topics = data;
      }
    });
  },
  methods: {
    submit() {
      this.articleCreate(this.params).then((data) => {
        if (data) {
          this.hideModal();
        }
      });
    },
    hideModal() {
      $('#article-share-dialog').modal('hide');
      this.params = {
        topic_id: '',
        title: '',
        summary: '',
        tags: '',
      };
    },
  },
};
</script>

<style scoped>
</style>
