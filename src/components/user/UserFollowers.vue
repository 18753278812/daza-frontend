<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-12">
            <h3>标签广场</h3>
          </div>
        </div>
        <hr>
        <div class="row tag-list">
          <div class="col-sm-4" v-for="tag in tags">
            <div class="image">
              <img class="img-rounded" v-lazy="tag.image_url">
            </div>
            <div class="content">
              <div style="margin: 0;">
                <a class="name" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</a>
              </div>
              <p class="description">{{ tag.description }}</p>
            </div>
            <hr>
            <!-- <hr v-bind:style="$index % 2 == 0 ? 'margin-right: -15px;' : 'margin-left: -15px;'"> -->
          </div>
        </div>
      </div>
      <div class="col-sm-4" style="display: none;">
        <div class="row">
          <div class="col-xs-6">
            <h5>TITLE</h5>
          </div>
          <div class="col-xs-6 text-xs-right">

          </div>
          <div class="col-xs-12">
            <p>
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getUserFollowers } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
      tags: state => state.tags.all,
    },
    actions: {
      getUserFollowers,
    },
  },
  data() {
    return {
      pagination: {
        total: 0,
        per_page: 15,
        current_page: 1,
        last_page: 0,
        from: null,
        to: null,
      },
    };
  },
  ready() {
    const userId = this.$route.params.id;
    NProgress.start();
    this.getUserFollowers(userId, 1).then(data => {
      this.pagination = data.pagination;
      NProgress.done();
    });
  },
  components: {
    VuePagination,
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  list-style-type: none;
  padding: 0;
  div {
    .image {
      display: table-cell;
      vertical-align: top;
      img {
        width: 60px;
        height: 60px;
      }
    }
    .content {
      width: 10000px;
      display: table-cell;
      vertical-align: top;
      padding-left: 12px;
      .name {
        font-size: 14px;
      }
      .description {
        font-size: 12px;
        color: #bbb;
        margin-bottom: 2px;
        height: 32px;
        line-height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  hr {
    margin: 10px 0;
  }
}
</style>
