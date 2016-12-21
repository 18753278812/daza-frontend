import Vue from 'vue';

Vue.filter('moment', require('./moment'));
Vue.filter('commonmark', require('./commonmark'));
Vue.filter('thumbnail', require('./thumbnail'));
