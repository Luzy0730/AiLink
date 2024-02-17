import request from '../utils/request';

// 生成短链
export function createShort(data) {
  return request.post('/short/create', data);
}

// 解析短链
export function analysisShort(params) {
  return request.get('/short/analysis', { params });
}

// 获取短链列表
export function getShortList(params) {
  return request.get('/short/list', { params });
}

// 更新短链
export function updateShort(data) {
  return request.post('/short/update', data);
}

// 更新短链
export function deleteShort(data) {
  return request.post('/short/delete', data);
}
