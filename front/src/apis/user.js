import request from '../utils/request';

// 获取验证码
export function getCode(data) {
  return request.post('/user/code', data);
}

// 注册用户
export function register(data) {
  return request.post('/user/register', data);
}

// 登录
export function login(data) {
  return request.post('/user/login', data);
}

// 校验用户信息
export function validate(data) {
  return request.post('/user/validate', data);
}
