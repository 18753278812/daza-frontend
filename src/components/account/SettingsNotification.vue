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
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
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
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">订阅的主题有更新</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
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
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">收藏了我的文章</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <fieldset class="form-group row">
        <label class="col-xs-5 col-sm-3">@ / 评论我</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
              关闭
            </label>
          </div>
        </div>
      </fieldset>
      <hr>
      <h5>
        邮件设置<br>
        <small class="text-muted">你可以在这里设置是否接收邮件。</small>
      </h5>
      <div class="form-group row">
        <label class="col-xs-5 col-sm-3">每周精选</label>
        <div class="col-xs-7 col-sm-9">
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
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
              <input class="form-check-input" type="radio" name="" value="on" checked>
              开启
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input class="form-check-input" type="radio" name="" value="off">
              关闭
            </label>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">保存</button>
      </div>
    </form>
  </validator>
</template>

<script>
import { auth } from '../../vuex/getters';
import { updateProfile } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      updateProfile,
    },
  },
  data() {
    return {
      user: this.auth.user,
    };
  },
  ready() {
  },
  methods: {
    submit() {
    },
  },
};
</script>

<style scoped>
</style>
