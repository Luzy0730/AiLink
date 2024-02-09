const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');

const createRouter = require('../router');

const createRetHandler = require('./retHandler');

const errHandler = require('./errHandler');

require('@/db/db_cron')

const app = new Koa();

app.use(cors())

app.use(bodyparser());

app.on('error', errHandler);
createRetHandler(app);
createRouter(app);

module.exports = app;
