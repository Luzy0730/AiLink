const Router = require('koa-router');
const shortController = require('../../controller/short.controller');
const {
  url2shortByHash,
  canShortUsed,
} = require('../../middleware/short.middleware');
const router = new Router({ prefix: '/short' });

router.post('/create', url2shortByHash, shortController.createShort);
router.get('/analysis', canShortUsed, shortController.analysisShort);

module.exports = router.routes();
