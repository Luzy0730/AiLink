const Router = require('koa-router');
const shortController = require('../../controller/short.controller');
const { shortValidator } = require('../../middleware/short.middleware');
const router = new Router({ prefix: '/short' });

router.get('/list', shortController.getShortList);
router.get('/get', shortController.getShortById);

router.post('/add', shortValidator, shortController.craeteShort);

module.exports = router.routes();
