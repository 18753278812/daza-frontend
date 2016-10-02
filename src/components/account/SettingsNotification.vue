<template>
  <validator name="validation">
    <form novalidate @submit.prevent="submit()">
      <h5>
        消息设置<br>
        <small class="text-muted">你可以在这里设置接收的消息类型。</small>
      </h5>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">有人关注了我</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_followed" value="true" v-model="params.notification_followed" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_followed" value="false" v-model="params.notification_followed">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">订阅了我的主题</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_subscribed" value="true" v-model="params.notification_subscribed" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_subscribed" value="false" v-model="params.notification_subscribed">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">赞了我的文章</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_upvoted" value="true" v-model="params.notification_upvoted" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_upvoted" value="false" v-model="params.notification_upvoted">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row" style="display: none;">
        <label class="col-xs-5 col-sm-3">收藏了我的文章</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="true" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="false">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">评论我</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_comment" value="true" v-model="params.notification_comment" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_comment" value="false" v-model="params.notification_comment">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">提及我</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_mention" value="true" v-model="params.notification_mention" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="notification_mention" value="false" v-model="params.notification_mention">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <hr>
      <!-- <h5>
        邮件设置<br>
        <small class="text-muted">你可以在这里设置是否接收邮件。</small>
      </h5>
      <div class="form-group row">
        <label class="col-xs-5 col-sm-3">每周精选</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="true" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="false">
              关闭
            </label>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xs-5 col-sm-3">产品和功能更新</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="true" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="false">
              关闭
            </label>
          </div>
        </div>
      </div>
      <hr> -->
      <div class="form-group">
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </form>
  </validator>
</template>

<script>
import toastr from 'toastr';
import { auth } from '../../vuex/getters';
import { updateProfile, updateConfigs } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      updateProfile,
      updateConfigs,
    },
  },
  data() {
    return {
      data: {
        user: this.auth.user,
      },
      params: {
        notification_followed: 'true',
        notification_subscribed: 'true',
        notification_upvoted: 'true',
        notification_comment: 'true',
        notification_mention: 'true',
      },
    };
  },
  ready() {
    const configs = this.auth.configs;
    if (configs instanceof Array) {
      configs.forEach((value) => {
        this.params[value.key] = value.value;
      });
    }
  },
  methods: {
    submit() {
      this.updateConfigs(this.params).then(() => {
        toastr.success('消息设置修改成功');
      });
    },
  },
};
</script>

<style scoped>
</style>
