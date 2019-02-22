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
// axios
import axios from 'axios'
import {post,fetch,patch,put} from './http'
// 日期
import Moment from 'moment'
Vue.prototype.$moment = Moment;
// oss上传
import OssApi from '../src/oss'
//定义全局变量
console.log(OssApi)
Vue.prototype.$OssApi = OssApi.uploadRequest
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$oss = 'https://imuts.oss-cn-shenzhen.aliyuncs.com/'
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
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router: routers,
  components: {
    App
  },
  template: '<App/>'
})
