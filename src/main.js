import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/Toast/index.js'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'
Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyLoad,{
  loading:require('./assets/img/tabbar/category.svg')
})
Vue.prototype.$bus = new Vue()
Vue.use(Toast)
new Vue({
  render: h => h(App),
  router,
  store
  
}).$mount('#app')
