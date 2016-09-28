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
          <div class="col-sm-4 col-md-3" v-for="tag in tags">
            <div class="image">
              <img class="lazy img-rounded" :data-original="tag.image_url">
            </div>
            <div class="content">
              <div style="margin: 0;">
                <a class="name" v-link="{ name: 'tag_detail', params: { name: tag.name } }">{{ tag.name }}</a>
              </div>
              <p class="description">{{ tag.description }}</p>
            </div>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <p class="text-xs-center" v-if="tags.length == 0">空空如也</p>
          </div>
        </div>
        <!-- 分页导航 -->
        <vue-pagination :pagination="data.pagination" :callback="loadTags"></vue-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import NProgress from 'nprogress';
import { auth } from '../../vuex/getters';
import { getTagList } from '../../vuex/actions';
import VuePagination from '../_common/VuePagination';

export default {
  vuex: {
    getters: {
      auth,
      tags: state => state.tags.all,
    },
    actions: {
      getTagList,
    },
  },
  data() {
    return {
      data: {
        pagination: {
          total: 0,
          per_page: 15,
          current_page: 1,
          last_page: 0,
          from: null,
          to: null,
        },
      },
    };
  },
  watch: {
    tags() {
      $('img.lazy').lazyload();
    },
  },
  ready() {
    this.loadTags(1);
  },
  components: {
    VuePagination,
  },
  methods: {
    loadTags(page) {
      window.scrollTo(0, 0);
      NProgress.start();
      this.getTagList(page).then(data => {
        this.data.pagination = data.pagination;
        NProgress.done();
      });
    },
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
        word-wrap: break-word;
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
