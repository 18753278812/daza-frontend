<template>
  <router-view></router-view>
  <div class="container">
    <div id="alert" class="alert alert-success alert-dismissible fade in" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="alert-heading">Well done!</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <p class="m-b-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
  </div>
</template>

<script>
import store from './vuex/store';

export default {
  store,
  data() {
    return {
    };
  },
  ready() {
  },
};
</script>

<style lang="scss">
html, body {
  font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 14px;
}

#alert {
  position: fixed;
  max-width: 400px;
  margin-left: 12px;
  top: 12px;
  right: 12px;
  z-index: 9999;
     -moz-box-shadow: 0 0 12px #999999;
  -webkit-box-shadow: 0 0 12px #999999;
          box-shadow: 0 0 12px #999999;
}

#wrapper {
  .bg-inverse {
    background-color: #37474F;
  }
  .navbar-brand img {
    height: 1.2rem;
    width: auto;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
}
#wrapper > {
  .container {
    padding-top: 70px;
    padding-bottom: 20px;
  }
}
#wrapper {
  // Extra small devices (portrait phones, less than 544px)
  @media (max-width: 543px) {
    .search-form {
      display: none;
    }
  }

  // Small devices (landscape phones, less than 768px)
  @media (max-width: 767px) {
  }

  // Medium devices (tablets, less than 992px)
  @media (max-width: 991px) {
  }

  // Large devices (desktops, less than 1200px)
  @media (max-width: 1199px) {
  }
}
</style>
