const frontShort = require('./modules/front.short.route');
const frontUser = require('./modules/front.user.route');
const frontRoutesFns = [frontShort, frontUser];
module.exports = function createRouter(app) {
  frontRoutesFns.forEach((routesFn) => app.use(routesFn));
};
