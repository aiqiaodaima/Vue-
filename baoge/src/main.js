// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'lib-flexible/flexible.js'
import routers from './router/index'
// import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);
Vue.use(Vant);
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from 'element-china-area-data'


Vue.config.productionTip = false
// 全局注册组件
// Vue.component(
//   "users", User
// )
Vue.use(ElementUI);

// 组件路由
// Vue.use(VueRouter);

// const routes = [{
//   path: "/",
//   component: Login
// }, {
//   path: "/user",
//   component: User
// }]

// const router = new VueRouter({
//   routes,
//   mode: 'history'
// })
new Vue({
  el: '#app',
  router: routers,
  components: {
    App
  },
  template: '<App/>'

})
