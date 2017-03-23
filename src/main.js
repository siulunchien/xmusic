// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import * as filters from './filter'
import FastClick from 'fastclick'

FastClick.attach(document.body)
Vue.use(VueResource)
Vue.config.productionTip = false

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
