import './css/base.css'
import './css/button.css'
import 'font-awesome/css/font-awesome.css'
import './css/normalize.css'
import './css/component.css'
import './css/animate.css'
import './css/plugin.css'
import 'mavon-editor/dist/css/index.css'
//引入loading插件
import loading from 'src/plugins/loading/loading.js'

//引入mixin
import mixin from './mixin.js';

//引入store
import store from 'src/store/index'

import mavonEditor from 'mavon-editor'


import Vue from 'vue';
import axios from 'axios';
import { Notification, Button, Input, Tag, Form, FormItem, Radio, DatePicker, TimePicker } from 'element-ui';

Vue.prototype.$notify = Notification;

Vue.use(loading)
Vue.use(mavonEditor)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Button)

Vue.mixin(mixin) //混入全局方法

const vue = new Vue();

axios.defaults.withCredentials = true
const axiosIns = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:9009' : 'http://182.92.87.130:9009',
  timeout: 30000
});

/*请求拦截器*/
axiosIns.interceptors.request.use((config) => {
  vue.$loading.show()//loading
  return config;
}, error => {
  return Promise.reject(error);
});

/*响应拦截器*/
axiosIns.interceptors.response.use(config => {
  //401登录状态过期
  // if(config.data.status == 401) {
  //   vue.$notify({
  //     title: '提示',
  //     message: config.data.message,
  //     type: 'error'
  //   })

  //   setTimeout( () => {
  //     window.location.href = 'login.html'
  //     window.localStorage.removeItem('userid')
  //   }, 3000)
  // }
  vue.$loading.hide()
  return config;
}, error => {
  vue.$notify({
    title: '提示',
    message: '网络错误',
    type: 'error'
  })
  vue.$loading.hide()
})

Vue.prototype.$http = axiosIns;

Vue.config.productionTip = process.env.NODE_ENV == 'development' ? true : false

//组件注册
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '../components',
  true,
  /[A-Z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

export {
  Vue,
  store
}
