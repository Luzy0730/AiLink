const Router = require('koa-router');
const ShortController = require('@/controller/short.controller');
const { url2shortByHash, canShortUsed, hasToken } = require('@/middleware/short.middleware');
const { auth } = require('@/middleware/user.middleware');
const { validatePagination } = require('@/middleware/index.middleware');

const router = new Router({ prefix: '/api/v1/short' });

router.post('/create', url2shortByHash, hasToken, ShortController.createShort);
router.get('/analysis', canShortUsed, ShortController.analysisShort);
router.get('/list', auth, validatePagination, ShortController.getShortList);
router.post('/update', auth, ShortController.updateShort);
router.post('/delete', auth, ShortController.deleteShort);

module.exports = router.routes();
