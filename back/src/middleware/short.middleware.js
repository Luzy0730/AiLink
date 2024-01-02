const murmurhash = require('murmurhash-js');
const { string10to62 } = require('../utils/index');
const {
  shortFormateError,
  shortAlreadyExist,
} = require('../constant/err.type');
const shortService = require('../service/short.service');

// 判断short和url是否为空
const shortValidator = async (ctx, next) => {
  const { short, url } = ctx.request.body;
  if (!short || !url) {
    ctx.app.emit('error', shortFormateError, ctx);
    return;
  }
  if (await shortService.getShortInfo({ url, short })) {
    ctx.app.emit('error', shortAlreadyExist, ctx);
    return;
  }
  await next();
};

// 长链接转短hash
const url2shortByHash = async (ctx, next) => {
  const { url } = ctx.request.body;
  const hash = murmurhash(url);
  ctx.request.body.url = string10to62(hash);
  await next();
};

module.exports = { shortValidator, url2shortByHash };
