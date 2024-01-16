module.exports = {
  shortFormateError: {
    code: '10000',
    message: '参数不能为空',
    data: null,
  },
  userFormateError: {
    code: '10000',
    message: '用户名或密码不能为空',
    data: null,
  },
  invalidToken: {
    code: '10001',
    message: '未经授权的访问',
    data: null,
  },
  shortIsProtected: {
    code: '10001',
    message: '受保护的短链',
    data: null,
  },
  shortAlreadyExist: {
    code: '10009',
    message: 'short已存在',
    data: null,
  },
  userIsAlreayExist: {
    code: '10009',
    message: '用户名已存在',
    data: null,
  },
  shortIsNotExist: {
    code: '10004',
    message: '不存在指定short的短链',
    data: null,
  },
  userIsNotExist: {
    code: '10004',
    message: '不存在指定用户',
    data: null,
  },
  shortIsExpire: {
    code: '10004',
    message: '短链已失效',
    data: null,
  },
  shortDefedIsExist: {
    code: '10009',
    message: '自定义短链已被占用',
    data: null,
  },
};
