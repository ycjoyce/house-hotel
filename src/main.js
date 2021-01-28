import Vue from 'vue';
import App from '@src/App.vue';
import router from '@src/router';
import store from '@src/store';

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
