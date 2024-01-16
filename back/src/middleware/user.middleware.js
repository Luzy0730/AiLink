const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  userFormateError,
  userIsAlreayExist,
  userIsNotExist,
  invalidToken,
} = require('../constant/err.type');
const UserService = require('../service/user.service');

// 用户信息校验
const canUserRegister = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  try {
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (ret) {
      ctx.app.emit('error', userIsAlreayExist, ctx);
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.handleError(ctx, error);
    return;
  }
  await next();
};

// 校验登录合法性
const validateLoginInfo = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userFormateError, ctx);
    return;
  }
  try {
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (!ret) {
      ctx.app.emit('error', userIsNotExist, ctx);
      return;
    }
    if (bcryptjs.compareSync(password, ret.password)) {
      ctx.request.body.userInfo = ret;
    } else {
      ctx.handleError(ctx, { msg: '用户名或密码错误' });
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.handleError(ctx, error);
    return;
  }
  await next();
};

// 校验权限
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) return ctx.app.emit('error', invalidToken, res);
  const token = authorization.substring(7); // 去掉 Bearer 后的空格，剩下的部分就是访问令牌
  try {
    // user中包含了payload的信息(id, userName)
    const userInfo = jwt.verify(token, JWT_SECRET);
    ctx.request.body.userInfo = userInfo;
  } catch (err) {
    switch (err.name) {
      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return ctx.app.emit('error', invalidToken, res);
    }
  }
  await next();
};

// 密码加密
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcryptjs.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcryptjs.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

module.exports = { canUserRegister, validateLoginInfo,auth, crpytPassword };
