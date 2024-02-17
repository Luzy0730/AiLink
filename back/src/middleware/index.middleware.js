const {
  paramsFormateError
} = require('@/constant/err.type');
const { isNonNegativeInteger } = require('@/utils/validate')

// 分页格式校验
const validatePagination = async (ctx, next) => {
  const { page, pageSize } = ctx.request.query;
  // 参数校验
  if (!page || !pageSize) {
    res.app.emit('error', paramsFormateError, res);
    return;
  }
  if (!isNonNegativeInteger(page) || !isNonNegativeInteger(pageSize)) {
    return res.app.emit('error', paramsFormateError, res);
  }
  // string转number
  ctx.request.query.page = parseInt(ctx.request.query.page, 10);
  ctx.request.query.pageSize = parseInt(ctx.request.query.pageSize, 10);
  await next();
};

module.exports = { validatePagination };
