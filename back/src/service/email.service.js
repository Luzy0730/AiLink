const nodemailer = require('nodemailer');
const { stringCode } = require('@/utils/index')
const rd = require('@/db/db_redis');
const { CODE_EMAIL_TEXT } = require('../config/config_default');


class emailService {

  // 发送邮件
  async sendMail(mailMsg = {}) {
    // 创建传输器对象
    const transporter = nodemailer.createTransport({
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'admin@onlycub.top',
        pass: 'r7ZyBkEGHHfdLHkg',
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
      return `发送成功：${info.messageId}`
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // 注册验证码
  async getSignInCode(username, mode) {
    const code = stringCode()
    const msg = {
      to: username, // 收件人邮箱地址
      subject: eval(CODE_EMAIL_TEXT)[mode],
      text: `您的验证码为：${code}`,
    };
    try {
      await this.sendMail(msg);
      return code
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}


module.exports = new emailService();
