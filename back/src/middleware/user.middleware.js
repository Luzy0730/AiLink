const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rd = require('../db/db_redis');
const { JWT_SECRET, CODE_MODES } = require('../config/config_default');
const {
  userparamsFormateError,
  userIsAlreayExist,
  userIsNotExist,
  invalidToken,
  codeHasAlreadySend,
  paramsFormateError
} = require('../constant/err.type');
const UserService = require('../service/user.service');

// 用户信息校验
const canUserRegister = async (ctx, next) => {
  const { username, password, code, reset = false } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userparamsFormateError, ctx);
    return;
  }
  try {
    const rdcode = await rd.getObj(`code:${eval(CODE_MODES)[reset ? 1 : 0]}:${username}`);
    if (!rdcode) {
      ctx.handleError(ctx, { msg: '验证码失效' })
      return;
    } else {
      if (rdcode !== code) {
        ctx.handleError(ctx, { msg: '验证码错误' })
        return
      }
    }
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (ret) {
      if (!reset) {
        ctx.app.emit('error', userIsAlreayExist, ctx);
        return;
      } else {
        ctx.request.body.id = ret.id
      }
    } else if (!ret && reset) {
      ctx.app.emit('error', userIsNotExist, ctx);
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.handleError(ctx, error);
    return;
  }
  await next();
};

// 是否允许重置密码
const allowResetPwd = async (ctx, next) => {
  const { username, password, code } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userparamsFormateError, ctx);
    return;
  }
  try {
    const rdcode = await rd.getObj(`code:${eval(CODE_MODES)[1]}:${username}`);
    if (!rdcode) {
      ctx.app.emit('error', paramsFormateError, ctx);
      return;
    } else {
      if (rdcode !== code) {
        ctx.handleError(ctx, { msg: '验证码错误' })
        return
      }
    }
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (!ret) {
      ctx.app.emit('error', userIsNotExist, ctx);
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.handleError(ctx, error);
    return;
  }
  await next();
}

// 校验登录合法性
const validateLoginInfo = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userparamsFormateError, ctx);
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

// 是否允许发送验证码
const validateAllowSignInCode = async (ctx, next) => {
  const { username, mode = 0 } = ctx.request.body;
  // 合法性
  if (!username) {
    ctx.app.emit('error', userparamsFormateError, ctx);
    return;
  }
  try {
    // 账户是否已存在
    const ret = await UserService.getUserInfo({ username });
    if (ret && mode == 0) {
      ctx.app.emit('error', userIsAlreayExist, ctx);
      return;
    } else if (!ret && mode == 1) {
      ctx.app.emit('error', userIsNotExist, ctx);
      return;
    }
    // 是否已经发送校验码
    const code = await rd.getObj(`code:${eval(CODE_MODES)[mode]}:${username}`);
    if (code) {
      ctx.app.emit('error', codeHasAlreadySend, ctx);
      return;
    }
  } catch (error) {
    console.log(error);
    ctx.handleError(ctx, error);
    return;
  }
  await next();
}

// 校验权限
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (!authorization) return ctx.app.emit('error', invalidToken, res);
  const token = authorization.substring(7); // 去掉 Bearer 后的空格，剩下的部分就是访问令牌
  try {
    // user中包含了payload的信息(id, userName)
    const userInfo = jwt.verify(token, JWT_SECRET);
    const ret = await UserService.getUserInfo({ id: userInfo.id })
    if (ret) {
      ctx.request.body.userInfo = ret;
    } else {
      ctx.app.emit('error', invalidToken, ctx);
      return
    }
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

module.exports = { allowResetPwd, canUserRegister, validateLoginInfo, validateAllowSignInCode, auth, crpytPassword };
