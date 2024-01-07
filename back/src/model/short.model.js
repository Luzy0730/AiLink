const { DataTypes } = require('sequelize');
const seq = require('../db/db_sequ');
const Short = seq.define(
  'short',
  {
    short: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      comment: '短链地址中的key',
    },
    url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      comment: '原始地址',
    },
    status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1,
      comment: '状态 1: 启用 0：停用',
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER(11),
      comment: '创建者id',
    },
    visitCount: {
      field: 'visit_count',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 0,
      comment: '访问次数',
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(8),
      comment: '访问密码'
    },
    expireTime: {
      field: 'expire_time',
      type: DataTypes.DATE,
      comment: '过期时间',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);

// Short.sync({ force: true });

module.exports = Short;
