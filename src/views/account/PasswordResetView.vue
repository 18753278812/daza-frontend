<template>
  <div class="ui main container">
    <div class="row">
      <div class="col-md-4 col-sm-3"></div>
      <div class="col-md-4 col-sm-6">
        <h3 class="text-xs-center">重置密码</h3>
        <div class="validator">
          <form novalidate @submit.prevent="submit()">
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="请输入新密码"
                v-model="params.new_password">
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">确定</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-4 col-sm-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        new_password: '',
      },
    };
  },
  methods: {
    submit() {
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
