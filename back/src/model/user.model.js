const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');
const User = seq.define(
  'user',
  {
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      comment: '用户名',
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '密码',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);

User.sync({ force: true });
module.exports = User;
