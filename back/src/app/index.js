const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');

const createRouter = require('../router');

const createMiddleware = require('../middleware');

const errHandler = require('./errHandler');

const app = new Koa();

app.use(cors())

app.use(bodyparser());

app.on('error', errHandler);
createMiddleware(app);
createRouter(app);

module.exports = app;
