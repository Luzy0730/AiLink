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
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      comment: '原始地址',
    },
    status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1,
      comment: '状态',
    },
    createId: {
      field: 'create_id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: '创建者id',
    },
  },
  {
    createdAt: 'create_time',
    updatedAt: 'update_time',
  }
);

Short.sync({ force: true });

module.exports = Short;
