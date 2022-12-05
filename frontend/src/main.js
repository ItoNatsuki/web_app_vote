// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";

Vue.config.productionTip = false

const axios_inst = axios.create(
  {
    baseURL: 'http://localhost:3000/apis'
  }
)
Vue.prototype.$axios_inst = axios_inst;
Vue.prototype.$base_url = 'http://localhost:8080/#';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
