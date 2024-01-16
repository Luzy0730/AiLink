const Router = require('koa-router');
const UserController = require('../../controller/user.controller');
const { getSignInCode } = require('../../middleware/email.middleware');
const {
  crpytPassword,
  canUserRegister,
  validateLoginInfo,
} = require('../../middleware/user.middleware');
const router = new Router({ prefix: '/api/v1/user' });

router.post(
  '/register',
  canUserRegister,
  crpytPassword,
  UserController.register
);

router.post('/login', validateLoginInfo, UserController.login);

module.exports = router.routes();
