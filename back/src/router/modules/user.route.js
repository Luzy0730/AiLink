const Router = require('koa-router');
const UserController = require('../../controller/user.controller');
const { getSignInCode } = require('../../middleware/email.middleware');
const router = new Router({ prefix: '/user' });

router.get('/signin', getSignInCode);

module.exports = router.routes();
