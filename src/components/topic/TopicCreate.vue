<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>新建主题</h3>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group row">
              <label for="category-input" class="col-xs-2 col-form-label">分类</label>
              <div class="col-xs-10">
                <select class="form-control">
                  <option>Default select</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="name-input" class="col-xs-2 col-form-label">名称</label>
              <div class="col-xs-10">
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder=""
                  v-model="params.name"
                  v-validate:email="rules.name">
              </div>
            </div>
            <div class="form-group row">
              <label for="description-input" class="col-xs-2 col-form-label">描述</label>
              <div class="col-xs-10">
                <textarea
                  id="description-input"
                  class="form-control"
                  rows="3"
                  name="description"
                  placeholder=""
                  v-model="params.description"
                  v-validate:email="rules.description"></textarea>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="!$validation.valid">确认</button>
            </div>
          </form>
        </validator>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../vuex/getters';
import { topicCreate } from '../../vuex/actions';
// import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      topicCreate,
    },
  },
  data() {
    return {
      rules: {
        name: { required: true },
        description: { required: true, minlength: 15 },
      },
      params: {
        type: 'test',
        name: '',
        description: '',
      },
    };
  },
  ready() {
  },
  methods: {
    submit() {
      this.topicCreate(this.params).then(() => {
        this.$route.router.go('/');
      });
    },
  },
};
</script>

<style scoped>
</style>
