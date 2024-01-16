const Router = require('koa-router');
const ShortController = require('../../controller/short.controller');
const {
  url2shortByHash,
  canShortUsed,
  hasToken,
} = require('../../middleware/short.middleware');

const router = new Router({ prefix: '/api/v1/short' });

router.post('/create', url2shortByHash, hasToken, ShortController.createShort);
router.get('/analysis', canShortUsed, ShortController.analysisShort);

module.exports = router.routes();
