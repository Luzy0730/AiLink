import request from '../utils/request';

// 生成短链
export function createShort(data) {
  return request.post('/short/create', data);
}

// 解析短链
export function analysisShort(params) {
  return request.get('/short/analysis', { params });
}
