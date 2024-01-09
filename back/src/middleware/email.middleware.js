const nodemailer = require('nodemailer');

// 发送邮件
async function sendMail(ctx, mailMsg = {}) {
  // 创建传输器对象
  const transporter = nodemailer.createTransport({
    host: 'smtp.qiye.aliyun.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'admin@onlycub.top',
      pass: 'ledMDy0zFvswJ9rw',
    },
  });
  // 配置邮件内容
  let mailOptions = {
    from: '"OnlyCub"<admin@onlycub.top>', // 发件人显示名称及邮箱地址
  };
  Object.assign(mailOptions, mailMsg);
  // 发送邮件
  try {
    const info = await transporter.sendMail(mailOptions);
    ctx.handleData(ctx, `发送成功：${info.messageId}`);
  } catch (error) {
    ctx.handleError(ctx, error);
  }
}

// 注册验证码
const getSignInCode = async (ctx, next) => {
  const { username } = ctx.request.body;
  // username不存在
  // username是否已注册
  const msg = {
    to: '349740120@qq.com', // 收件人邮箱地址
    subject: '欢迎注册AiLink短链',
    text: '您的注册验证码为：1i0vou',
  };
  try {
    await sendMail(ctx, msg);
  } catch (error) {
    console.log(error);
  }
  await next()
};

module.exports = { getSignInCode };
