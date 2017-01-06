<template>
  <div :id="uniqueId" class="ui picker modal">
    <i class="close icon"></i>
    <div class="header">
      图片资源
    </div>
    <div class="content">
      <div class="ui grid">
        <div class="center aligned sixteen wide column">
          <div :id="uniqueDragdropZoneId" class="qiniu-dragdrop-zone">
            <a href="#" :id="uniqueBrowseButtonId">
              <img src="/static/images/ic_file_upload.png" />
              <p>选择或拖拽文件至此</p>
            </a>
          </div>
        </div>
        <div class="sixteen wide column" v-if="uploading.length > 0">
          <!-- 上传中 -->
          <div class="ui relaxed divided list">
            <div class="item" v-for="file in uploading" v-if="file.percent < 100">
              <div class="content">
                <h3 class="header">{{file.name}}</h3>
                <div class="ui green progress" style="margin: 5px 0px;">
                  <div class="bar" style="transition-duration: 300ms;" v-bind:style="{ width: file.percent + '%' }">
                    <div class="progress">{{file.percent}}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sixteen wide column">
          <!-- 可选资源 -->
          <div class="ui assets grid">
            <div class="four wide center aligned column" v-for="asset in assets.lists">
              <div class="box">
                <a href="#" v-on:click.prevent="selectAsset(asset)">
                  <imageView
                    class="ui image"
                    :src="asset.url" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        取消
      </div>
      <div class="ui positive right labeled icon button">
        确定
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import shortid from 'shortid';
import ImageView from '../../components/ImageView';

const $ = global.jQuery;
const Qiniu = global.Qiniu;
const plupload = global.plupload;

export default {
  components: {
    ImageView,
  },
  data() {
    return {
      uniqueId: shortid.generate(),
      isInitialized: false,
      uploading: [],
    };
  },
  props: {
    show: {
      type: Boolean,
    },
    targetType: {
      type: String,
      required: true,
    },
    targetId: {
      type: [String, Number],
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  computed: mapState({
    assets: state => state.assets.picker.assets,
    uniqueBrowseButtonId() {
      return `${this.uniqueId}-browse-button`;
    },
    uniqueDragdropZoneId() {
      return `${this.uniqueId}-dragdrop-zone`;
    },
  }),
  methods: {
    qiniuInit() {
      // 防止当targetId为空时（数据未加载完成）就进行的初始化
      if (this.targetId === null || this.targetId === 0) {
        return;
      }
      // 加载当前targetId的所有资源
      this.$store.dispatch('assetPickerGetLists', {
        target_type: this.targetType,
        target_id: this.targetId,
      });

      const self = this;
      // 引入Plupload 、qiniu.js后
      Qiniu.uploader({
        runtimes: 'html5,flash,html4',                      // 上传模式,依次退化
        browse_button: self.uniqueBrowseButtonId,                   // 上传选择的点选按钮，**必需**
        uptoken_url: `${process.env.API_URL}/qiniu/token`,  // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        domain: process.env.QINIU_DOMAIN,                   // bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,                             // 设置上传文件的时候是否每次都重新获取新的token
        container: self.uniqueDragdropZoneId,                   // 上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',                             // 最大文件体积限制
        flash_swf_url: '/static/vendor/plupload/js/plupload/Moxie.swf',  // 引入flash,相对路径
        max_retries: 3,                                     // 上传失败最大重试次数
        dragdrop: true,                                     // 开启可拖曳上传
        drop_element: this.uniqueDragdropZoneId,                // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                                  // 分块上传时，每片的体积
        auto_start: true,                                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          FilesAdded(up, files) {
            plupload.each(files, (file) => {
              // 文件添加进队列后,处理相关的事情
              // Object.assign(file, { progress: 0 });
              self.uploading.push(file);
            });
          },
          // BeforeUpload(up, file) {
          // },
          // UploadProgress(up, file) {
          // },
          FileUploaded(up, file, info) {
            const key = JSON.parse(info).key;
            const params = {
              target_type: self.targetType,
              target_id: self.targetId,
              mime_type: file.type,
              size: file.size,
              url: `${process.env.QINIU_DOMAIN}/${key}`,
            };
            self.$store.dispatch('assetPickerSubmit', params);
          },
          // Error(up, err, errTip) {
          // },
          // UploadComplete() {
          // },
          Key(up, file) {
            const suffix = file.name.substr(file.name.indexOf('.'));
            return `${self.targetType}/${self.targetId}/${shortid.generate()}${suffix}`;
          },
        },
      });
      this.isInitialized = true;
    },
    selectAsset(asset) {
      this.callback(asset);
      $(`#${this.uniqueId}`).modal('hide');
    },
  },
  watch: {
    show() {
      $(`#${this.uniqueId}`).modal('show');
      if (!this.isInitialized) {
        this.qiniuInit();
      }
    },
    targetId() {
    },
  },
  beforeCreate() {
    this.$store.dispatch('assetPickerInit');
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.qiniu-dragdrop-zone {
  border: 2px dashed #929EA8;
  border-radius: 5px;
  background: white;
  padding-top: 20px;
  padding-bottom: 20px;
  display: block;
  a {
    color: #929EA8;
  }
}
.assets.grid {
  margin: 0px;
  .column {
    max-height: 150px;
    overflow: hidden;
    .box {
      border: 1px solid #ddd;
      border-radius: .25rem;
      padding: .25rem;
      img {
        width: 100%;
        height: 120px;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
