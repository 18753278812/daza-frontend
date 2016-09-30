<template>
  <div class="modal fade" id="asset-manager-dialog" tabindex="-1" role="dialog" aria-labelledby="asset-manager-dialog-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="asset-manager-dialog-label">资源</h4>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <div id="qiniu-dragdrop-zone" class="text-xs-center">
                  <a href="#" id="qiniu-pickfiles"><span>选择或拖拽文件至此</span></a>
                </div>
              </div>
            </div>
            <div v-if="data.uploading.length > 0">
              <hr>
              <div class="row" >
                <div class="col-sm-12">
                  <ul class="list-unstyled">
                    <li v-for="file in data.uploading" v-if="file.percent < 100">
                      <div class="text-xs-center" id="example-caption-5">{{file.name}}&hellip; {{file.percent}}%</div>
                      <progress class="progress" :value="file.percent" max="100" aria-describedby="example-caption-5"></progress>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3 col-xs-4" v-for="asset in data.assets">
                <a href="#" v-on:click.prevent="selectAsset(asset)">
                  <div class="caption">
                  </div>
                  <div class="image">
                    <img class="lazy img-thumbnail" style="width: 100%; height: 100%;" :data-original="asset.url" :alt="asset.url">
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          <button type="submit" class="btn btn-primary">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Qiniu from 'qiniu';
import plupload from 'plupload';
import shortid from 'shortid';
import { auth } from '../../vuex/getters';
import { getAssetList, assetCreate } from '../../vuex/actions';

export default {
  vuex: {
    getters: {
      auth,
    },
    actions: {
      getAssetList,
      assetCreate,
    },
  },
  props: {
    target_type: {
      type: String,
      required: true,
    },
    target_id: {
      type: String,
      required: true,
    },
    callback: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      data: {
        uploading: [],
        assets: [],
      },
      rules: {
        mime_type: { required: true },
        size: { required: true },
        url: { required: true },
      },
      params: {
        mime_type: '',
        size: '',
        url: '',
      },
    };
  },
  watch: {
    'data.uploading': () => {
      $('img.lazy').lazyload();
    },
    'data.assets': () => {
      $('img.lazy').lazyload();
    },
    target_id(oldValue, value) {
      if (oldValue !== value) {
        this.resetQiniu();
        console.log('reset2');
      }
    },
  },
  ready() {
    if (this.target_id) {
      this.resetQiniu();
      console.log('reset');
    }
  },
  methods: {
    submit() {
    },
    hideModal() {
      $('#asset-manager-dialog').modal('hide');
      this.params = {
        mime_type: '',
        size: '',
        url: '',
      };
    },
    resetQiniu() {
      this.getAssetList(1, this.target_type, this.target_id).then(data => {
        this.data.assets = data.data;
      });

      const self = this;

      // 引入Plupload 、qiniu.js后
      Qiniu.uploader({
        runtimes: 'html5,flash,html4',    // 上传模式,依次退化
        browse_button: 'qiniu-pickfiles',       // 上传选择的点选按钮，**必需**
        uptoken_url: `${process.env.API_URL}/qiniu/token`, // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        domain: process.env.QINIU_DOMAIN,   // bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  // 设置上传文件的时候是否每次都重新获取新的token
        container: 'qiniu-dragdrop-zone', // 上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           // 最大文件体积限制
        flash_swf_url: 'js/plupload/Moxie.swf',  // 引入flash,相对路径
        max_retries: 3,                   // 上传失败最大重试次数
        dragdrop: true,                   // 开启可拖曳上传
        drop_element: 'qiniu-dragdrop-zone',        // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                // 分块上传时，每片的体积
        auto_start: true,                 // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          FilesAdded(up, files) {
            plupload.each(files, (file) => {
              // 文件添加进队列后,处理相关的事情
              console.log(file);
              Object.assign(file, { progress: 0 });
              self.data.uploading.push(file);
            });
          },
          // BeforeUpload(up, file) {
          //   // 每个文件上传前,处理相关的事情
          //   console.log(up);
          //   console.log(file);
          // },
          // UploadProgress(up, file) {
          //   // 每个文件上传时,处理相关的事情
          //   console.log(up);
          //   console.log(file);
          //   Object.assign(file, { progress: 0 });
          // },
          FileUploaded(up, file, info) {
            console.log(up);
            const key = JSON.parse(info).key;
            const params = {
              target_type: self.target_type,
              target_id: self.target_id,
              mime_type: file.type,
              size: file.size,
              url: `${process.env.QINIU_DOMAIN}/${key}`,
            };
            self.assetCreate(params).then(data => {
              self.data.assets.push(data.data);
              delete self.data.uploading[file];
            });
            // 每个文件上传成功后,处理相关的事情
            // 其中 info 是文件上传成功后，服务端返回的json，形式如
            // {
            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
            //    "key": "gogopher.jpg"
            //  }
            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

            // var domain = up.getOption('domain');
            // var res = parseJSON(info);
            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
          },
          // Error(up, err, errTip) {
          //   // 上传出错时,处理相关的事情
          //   console.log(up);
          //   console.log(err);
          //   console.log(errTip);
          // },
          UploadComplete() {
            // 队列文件处理完毕后,处理相关的事情
          },
          Key(up, file) {
            console.log(up);
            const suffix = file.name.substr(file.name.indexOf('.'));
            return `${self.target_type}/${self.target_id}/${shortid.generate()}${suffix}`;
          },
        },
      });
    },
    selectAsset(asset) {
      this.callback(asset);
      this.hideModal();
    },
  },
};
</script>

<style lang="scss" scoped>
#qiniu-dragdrop-zone {
  border: 2px dashed #0275d8;
  border-radius: 5px;
  background: white;
  padding-top: 15px;
  padding-bottom: 15px;
}
.caption {

}
.image {
  position: relative;
  overflow: hidden;
  padding-bottom:100%;
  margin-bottom: 15px;
}
.image img {
  position: absolute;
}
</style>
