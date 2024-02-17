const Router = require('koa-router');
const UserController = require('../../controller/user.controller');
const {
  crpytPassword,
  canUserRegister,
  validateLoginInfo,
  validateAllowSignInCode,
  auth
} = require('@/middleware/user.middleware');
const router = new Router({ prefix: '/api/v1/user' });

router.post('/register', canUserRegister, crpytPassword, UserController.register);
router.post('/validate', auth, UserController.validate);
router.post('/login', validateLoginInfo, UserController.login);
router.post('/code', validateAllowSignInCode, UserController.sendCode);

module.exports = router.routes();
