import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './base.css'
import axios from 'axios';

Vue.use(ElementUI);
console.log(process.env)
const axiosIns = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:9009' : 'http://www.parsonz.xyz:9009',
});

Vue.prototype.$http = axiosIns;

Vue.config.productionTip = process.env.NODE_ENV == 'development' ? true : false
