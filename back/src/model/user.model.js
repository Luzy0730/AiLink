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
    state: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: "1",
      comment: '状态 1: 启用 0：停用',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);

// User.sync({ force: true });
module.exports = User;
