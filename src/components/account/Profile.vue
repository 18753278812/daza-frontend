<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="tab" href="#profile" role="tab">基本资料</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#account" role="tab">账号和安全</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#settings" role="tab">推送消息设置</a>
          </li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div class="tab-pane active" id="profile" role="tabpanel">
            <p>
              <div class="form-group row">
                <label for="avatar-input" class="col-xs-2 col-form-label">头像</label>
                <div class="col-xs-2">
                  <img v-bind:src="user.avatar_url" class="img-thumbnail" style="width: 80px; height: 80px;">
                </div>
                <div class="col-xs-4">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="use_gravatar"> 使用 <a href="https://cn.gravatar.com/">Gravatar</a>
                    </label>
                  </div>
                </div>
              </div>
              <hr>
              <div class="form-group row">
                <label for="name-input" class="col-xs-2 col-form-label">姓名</label>
                <div class="col-xs-10">
                  <input class="form-control" type="name" value="{{ user.name }}" id="name-input" placeholder="添加你的姓名">
                </div>
              </div>
              <div class="form-group row">
                <label for="city-input" class="col-xs-2 col-form-label">城市</label>
                <div class="col-xs-10">
                  <input class="form-control" type="text" value="{{ user.city }}" id="city-input" placeholder="添加你的城市">
                </div>
              </div>
              <div class="form-group row">
                <label for="website-input" class="col-xs-2 col-form-label">网站</label>
                <div class="col-xs-10">
                  <input class="form-control" type="url" value="{{ user.website }}" id="website-input" placeholder="添加你的网站">
                </div>
              </div>
              <div class="form-group row">
                <label for="bio-input" class="col-xs-2 col-form-label">简介</label>
                <div class="col-xs-10">
                  <textarea class="form-control" rows="3" id="bio-input" placeholder="在你的个人资料页中添加简介">{{ user.bio }}</textarea>
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">保存</button>
              </div>
            </p>
          </div>
          <div class="tab-pane" id="account" role="tabpanel">
            <p>
              ...
            </p>
          </div>
          <div class="tab-pane" id="settings" role="tabpanel">
            ...
          </div>
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
  data() {
    return {
      user: this.auth.user,
    };
  },
};
</script>

<style scoped>
</style>
