const UserService = require('../service/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config_default');

class UserController {
  async register(ctx, context) {
    const { username, password } = ctx.request.body;
    try {
      const res = await UserService.register({
        username,
        password,
      });
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

  // 校验
  async validate(ctx, context) {
    const { userInfo } = req.body;
    ctx.handleData(ctx, userInfo);
  }

}
module.exports = new UserController();
