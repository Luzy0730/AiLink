module.exports = (err, ctx) => {
  let status = 500;
  switch (err.code) {
    case '10000':
      status = 400;
      break;
    case '10001':
      status = 401;
      break;
    case '10004':
      status = 404;
      break;
    case '10009':
      status = 409;
      break;
    default:
      status = 500;
  }
  ctx.status = status;
  ctx.body = err;
};
