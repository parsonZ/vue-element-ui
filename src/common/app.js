import 'element-ui/lib/theme-chalk/index.css';
import './base.css'
import './button.css'
import '../../static/font-awesome/css/font-awesome.css'

import '../../static/css/normalize.css'
import '../../static/css/component.css'
import '../../static/css/animate.css'
import '../../static/css/plugin.css'

import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';

Vue.use(ElementUI);

const axiosIns = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:9009' : 'http://www.parsonz.xyz:9009',
});

axiosIns.interceptors.request.use(function (config) {
  config['loading'] = true
  return config;
}, function (error) {
  return Promise.reject(error);
});

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
