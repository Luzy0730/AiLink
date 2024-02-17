import axios from 'axios';
import store from '@/store/index'
import { globalMessage } from '@/utils/GMessage'

const request = axios.create({
  baseURL: process.env.REACT_APP_FRONT_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {

    const token = store.getState().user.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

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
    return response.data;
  },
  function (error) {
    const msg = error.response?.data.message || error.message;
    globalMessage.messageApi.error(msg || '请求出错')
    return Promise.reject(error);
  }
);

export default request;
