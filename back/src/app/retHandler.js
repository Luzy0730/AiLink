const bcrypt = require('bcryptjs');
function handleData(ctx, data = null, code = 200, message = 'success') {
  const response = {
    code,
    message,
    data,
  };
  ctx.body = response;
}

function handleError(ctx, error) {
  const sqlError = error.original?.sqlMessage;
  const normalError = error.errors ? error.errors[0]?.message : null;
  const msg = error.msg || normalError || sqlError || '服务出错';
  ctx.status = 500;
  handleData(ctx, null, 500, msg);
}

function crptyContent(content) {
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(content, salt);
  return hash;
}

module.exports = (app) => {
  app.context['handleData'] = handleData;
  app.context['handleError'] = handleError;
  app.context['crptyContent'] = crptyContent;
};
