const murmurhash = require('murmurhash-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rd = require('../db/db_redis');
const { JWT_SECRET, SHORT_EXPIRT_TIME } = require('../config/config_default');

const { string10to62 } = require('../utils/index');
const {
  shortFormateError,
  shortIsNotExist,
  shortIsExpire,
  shortIsProtected,
  shortDefedIsExist,
} = require('../constant/err.type');
const ShortService = require('../service/short.service');

const hasToken = async (ctx, next) => {
  try {
    const { authorization } = ctx.request.headers;
    if (authorization) {
      const token = authorization.substring(7); // 去掉 Bearer 后的空格，剩下的部分就是访问令牌
      const { id } = jwt.verify(token, JWT_SECRET);
      ctx.request.body.userId = id;
    }
  } catch (error) {
    console.log(error);
    ctx.app.emit('error', error, ctx);
  }
  await next();
};

// 检验短链是否失效
const canShortUsed = async (ctx, next) => {
  let { short, pwd } = ctx.request.query;
  // 参数是否传递
  if (!short) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  try {
    // redis 查询
    const shortRd = await rd.getObj(`short:${short}`);
    if (shortRd) {
      if (!(await isAllow(shortRd))) return;
      shortRd.visitCount++;
      await rd.setObj(`short:${short}`, shortRd);
      ctx.state.short = shortRd;
    } else {
      // 是否存在
      const res = await ShortService.getShortInfo({ short }, { status: 1 });
      if (!res) {
        ctx.app.emit('error', shortIsNotExist, ctx);
        return;
      } else {
        if (!(await isAllow(res))) return;
        res.visitCount++;
        rd.setObj(`short:${short}`, res);
        ctx.state.short = res;
      }
    }

    async function isAllow(st) {
      // 是否过期
      if (!st.userId && (new Date() - SHORT_EXPIRT_TIME) > new Date(st.create_time)) {
        await ShortService.deleteShort({ id: st.id });
        await rd.del(`short:${st.short}`);
        ctx.app.emit('error', shortIsExpire, ctx);
        return false;
      }
      // 是否加密
      if (st.password && pwd !== st.password) {
        ctx.app.emit('error', shortIsProtected, ctx);
        return false;
      }
      return true;
    }
  } catch (error) {
    console.log(error);
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

module.exports = { canShortUsed, url2shortByHash, hasToken };
