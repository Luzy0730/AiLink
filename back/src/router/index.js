const short = require('./modules/short.route');
const user = require('./modules/user.route');
const routesFns = [short, user];
module.exports = function createRouter(app) {
  routesFns.forEach((routesFn) => app.use(routesFn));
};
