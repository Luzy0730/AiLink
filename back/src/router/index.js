const short = require('./modules/short.route');
const routesFns = [short];
module.exports = function createRouter(app) {
  routesFns.forEach((routesFn) => app.use(routesFn));
};
