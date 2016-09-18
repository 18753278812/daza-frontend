<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h3>新建主题</h3>
        <hr>
        <validator name="validation">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <label class="form-control-label">分类：{{params.category_id}}</label>
              <select
                id="select2-category"
                class="form-control"
                name="category_id"
                v-model="params.category_id"
                v-select2="params.category_id"
                :options="{ placeholder: '选择一个分类' }"
                v-validate:category_id="rules.category_id">
                <option></option>
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="name-input" class="form-control-label">名称：</label>
              <input
                class="form-control"
                type="text"
                name="name"
                placeholder="请填写不小于2个字符的标题。"
                v-model="params.name"
                v-validate:name="rules.name">
            </div>
            <div class="form-group">
              <label for="description-input" class="form-control-label">描述：</label>
              <textarea
                id="description-input"
                class="form-control"
                rows="3"
                name="description"
                placeholder="请填写不小于10个字符的描述。"
                v-model="params.description"
                v-validate:description="rules.description"></textarea>
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
import { getCategoryList, topicCreate } from '../../vuex/actions';
// import NProgress from 'nprogress';

export default {
  vuex: {
    getters: {
      auth,
      categories: state => state.categories.all,
    },
    actions: {
      getCategoryList,
      topicCreate,
    },
  },
  data() {
    return {
      rules: {
        category_id: { required: true },
        name: { required: true, minlength: 2 },
        description: { required: true, minlength: 10 },
      },
      params: {
        category_id: '',
        type: 'test',
        name: '',
        description: '',
      },
    };
  },
  ready() {
    // 加载分类
    if (this.categories.length === 0) {
      this.getCategoryList();
    }
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
