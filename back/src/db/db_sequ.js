const { Sequelize } = require('sequelize');
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB,
} = require('../config/config_default');

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
  timezone: '+08:00',
  pool: {
    min: 0, // 最小连接数
    max: 5, // 最大链接数
    idle: 30000,
    acquire: 60000,
  },
});

seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch((err) => {
    console.log('数据库连接失败', err);
  });

// seq.sync({ force: true, alter: true })
//   .then(() => {
//     console.log('数据库同步完成');
//   })
//   .catch((error) => {
//     console.error('数据库同步失败:', error);
//   });
module.exports = seq;
