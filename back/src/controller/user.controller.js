const UserService = require('../service/user.service');
const EmailService = require('@/service/email.service')
const jwt = require('jsonwebtoken');
const rd = require('@/db/db_redis');
const { JWT_SECRET, CODE_MODES } = require('../config/config_default');

class UserController {
  async register(ctx, context) {
    const { username, password, id } = ctx.request.body;
    try {
      const params = id ? { username, password, id } : { username, password }
      const res = await UserService.register(params);
      rd.del(`code:${eval(CODE_MODES)[id ? 1 : 0]}:${username}`);
      ctx.handleData(ctx, res);
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

  // 登录
  async login(ctx, context) {
    const { password, ...ret } = ctx.request.body.userInfo;
    try {
      const token = jwt.sign(ret, JWT_SECRET);
      ctx.handleData(ctx, { userInfo: ret, token });
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

  // 获取验证码
  async sendCode(ctx, context) {
    const { username, mode = 0 } = ctx.request.body;
    try {
      const code = await EmailService.getSignInCode(username, mode)
      rd.setObj(`code:${eval(CODE_MODES)[mode]}:${username}`, code, 60);
      ctx.handleData(ctx, true);
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

  // 校验
  async validate(ctx, context) {
    const { userInfo } = ctx.request.body;
    const { password, ...ret } = userInfo
    ctx.handleData(ctx, ret);
  }

  async resetPassword(ctx, context) {

  }
}
module.exports = new UserController();
