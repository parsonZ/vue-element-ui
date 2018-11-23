import './css/base.css'
import './css/button.css'
import 'font-awesome/css/font-awesome.css'

import './css/normalize.css'
import './css/component.css'
import './css/animate.css'
import './css/plugin.css'

import Vue from 'vue';
import axios from 'axios';
import { Notification } from 'element-ui';
Vue.prototype.$notify = Notification;

const axiosIns = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:9009' : 'http://www.parsonz.xyz:9009',
  timeout: 30000
});

/*请求拦截器*/
axiosIns.interceptors.request.use((config) => {
  return config;
}, error => {
  return Promise.reject(error);
});

/*响应拦截器*/
axiosIns.interceptors.response.use(config => {
  config['loading'] = config.status == 200 ? false : true
  return config
}, error => {
  return {
    status: 500,
    message: 'Network Error'
  }
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
