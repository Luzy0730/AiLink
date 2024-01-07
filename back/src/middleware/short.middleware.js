const murmurhash = require('murmurhash-js');
const crypto = require('crypto');

const { string10to62 } = require('../utils/index');
const {
  shortFormateError,
  shortIsNotExist,
  shortIsExpire,
  shortIsProtected,
  shortDefedIsExist
} = require('../constant/err.type');
const ShortService = require('../service/short.service');

// 检验短链是否失效
const canShortUsed = async (ctx, next) => {
  let { short, pwd } = ctx.request.query;
  // 参数是否传递
  if (!short) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  try {
    // 是否存在
    const res = await ShortService.getShortInfo({ short }, { status: 1 });
    if (!res) {
      ctx.app.emit('error', shortIsNotExist, ctx);
      return;
    } else {
      // 是否加密
      if (res.password && pwd !== res.password) {
        ctx.app.emit('error', shortIsProtected, ctx);
        return;
      }
      // 是否过期
      if (res.expireTime && new Date() > new Date(res.expireTime)) {
        ctx.app.emit('error', shortIsExpire, ctx);
        await ShortService.deleteShort({ id: res.id });
        return;
      }
      ctx.state.short = res;
    }
  } catch (error) {
    ctx.handleError(ctx, error);
  }
  await next();
};

// 长链接转短hash
const url2shortByHash = async (ctx, next) => {
  let { url, short: _short_ } = ctx.request.body;
  // 参数是否传递
  if (!url) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  let short = '';
  // 自定义短链
  if (_short_) {
    const res = await ShortService.getShortInfo({ short: _short_ });
    if (res) return ctx.app.emit('error', shortDefedIsExist, ctx);
    short = _short_;
  } else {
    // 保证唯一性
    let isOnly = false;
    while (!isOnly) {
      url += crypto.randomBytes(16);
      short = string10to62(murmurhash(url));
      const isExist = await ShortService.getShortInfo({ short });
      if (!isExist) isOnly = true;
    }
  }
  ctx.request.body.short = short;
  await next();
};

module.exports = { canShortUsed, url2shortByHash };
