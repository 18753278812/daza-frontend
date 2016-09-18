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
                  v-model="params.topic_id">
                  <option></option>
                  <option v-for="topic in topics" :value="topic.id">{{ topic.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-control-label">链接：</label>
                <input
                  class="form-control"
                  type="text"
                  name="link"
                  placeholder="e.g. http://daza.io/articles/example"
                  v-model="link"
                  v-validate:email="rules.link">
              </div>
              <div class="form-group">
                <label class="form-control-label">标题：</label>
                <input
                  class="form-control"
                  type="text"
                  name="title"
                  placeholder="请填写不小于6个字符的标题。"
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
                  placeholder="请填写不小于10个字符的摘要。"
                  v-model="params.summary"
                  v-validate:email="rules.summary"></textarea>
              </div>
              <div class="form-group">
                <label class="form-control-label">标签：</label>
                <select
                  id="select2-tags"
                  class="form-control"
                  style="width: 100%"
                  name="tags"
                  multiple="multiple"
                  v-model="params.tags">
                </select>
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
import { articleCreate, getUserTopics } from '../../vuex/actions';
import $ from 'jquery';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      articleCreate,
      getUserTopics,
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
      rules: {
        title: { required: true, minlength: 6 },
        link: { required: true, url: true },
        summary: { required: true, minlength: 10 },
      },
      topics: [],
      params: {
        topic_id: null,
        title: '',
        summary: '',
        content: 'hi',
        tags: '',
      },
    };
  },
  ready() {
    $('#select2-topic').select2({
      placeholder: '选择一个主题',
      theme: 'bootstrap',
      dropdownParent: $('#article-share-dialog'),
    });
    $('#select2-tags').select2({
      placeholder: '请选择或者输入文章相关的标签',
      theme: 'bootstrap',
      tags: true,
      dropdownParent: $('#article-share-dialog'),
    });
    this.getUserTopics(this.auth.id).then((data) => {
      if (data) {
        this.topics = data;
      }
    });
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
