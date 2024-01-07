module.exports = {
  shortFormateError: {
    code: '10001',
    message: 'short或url不能为空',
    data: null,
  },
  shortAlreadyExist: {
    code: '10002',
    message: 'short或url已存在',
    data: null,
  },
  shortIsNotExist: {
    code: '10003',
    message: '不存在指定short的短链',
    data: null,
  },
  shortIsExpire: {
    code: '10004',
    message: '短链已失效',
    data: null,
  },
  shortIsProtected: {
    code: '10005',
    message: '受保护的短链',
    data: null,
  },
  shortDefedIsExist: {
    code: '10006',
    message: '自定义短链已被占用',
    data: null,
  },
};
