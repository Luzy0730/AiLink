const bcrypt = require('bcryptjs');
function handleData(ctx, data = null, code = 200, message = 'success') {
  const response = {
    code,
    message,
    data,
  };
  ctx.body = response;
}

function crptyContent(content) {
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文
  const hash = bcrypt.hashSync(content, salt);
  return hash;
}

module.exports = (app) => {
  app.context['handleData'] = handleData;
  app.context['crptyContent'] = crptyContent;
};
