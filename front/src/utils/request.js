import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  // baseURL: 'http://localhost:10200',
  baseURL: 'http://api.dl.guaiguaizhanhao.cn',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么，比如添加请求头等操作
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    console.log(response)
    return response.data;
  },
  function (error) {
    const { message: msg } = error.response?.data;
    message.error(msg || '请求出错');
    return Promise.reject(error.response);
  }
);

export default request;
