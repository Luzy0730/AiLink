const Router = require('koa-router');
const ShortController = require('../../controller/short.controller');
const {
  url2shortByHash,
  canShortUsed,
} = require('../../middleware/short.middleware');
const router = new Router({ prefix: '/short' });

router.post('/create', url2shortByHash, ShortController.createShort);
router.get('/analysis', canShortUsed, ShortController.analysisShort);

module.exports = router.routes();
