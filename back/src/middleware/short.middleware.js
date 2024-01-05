const murmurhash = require('murmurhash-js');
const crypto = require('crypto');

const { string10to62 } = require('../utils/index');
const {
  shortFormateError,
  shortIsNotExist,
  shortIsExpire,
} = require('../constant/err.type');
const ShortService = require('../service/short.service');

// 检验短链是否失效
const canShortUsed = async (ctx, next) => {
  let { short } = ctx.request.query;
  if (!short) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  try {
    const res = await ShortService.getShortInfo({ short }, { status: 1 });
    if (!res) {
      ctx.app.emit('error', shortIsNotExist, ctx);
      return;
    } else {
      if (res.expireTime && new Date() > new Date(res.expireTime)) {
        ctx.app.emit('error', shortIsExpire, ctx);
        await ShortService.deleteShort({ id: res.id });
        return;
      } else {
        ctx.state.short = res;
      }
    }
  } catch (error) {
    ctx.handleError(ctx, error);
  }

  await next();
};

// 长链接转短hash
const url2shortByHash = async (ctx, next) => {
  let { url } = ctx.request.body;
  if (!url) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  let isOnly = false;
  let short = '';
  while (!isOnly) {
    url += crypto.randomBytes(16);
    short = string10to62(murmurhash(url));
    const isExist = await ShortService.getShortInfo({ short });
    if (!isExist) isOnly = true;
  }
  ctx.request.body.short = short;
  await next();
};

module.exports = { canShortUsed, url2shortByHash };
