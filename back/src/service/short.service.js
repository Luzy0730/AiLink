const ShortModel = require('../model/short.model');
const seq = require('@/db/db_sequ');
const rd = require('@/db/db_redis');
const { Op } = require('sequelize');
const { SHORT_EXPIRT_TIME } = require('@/config/config_default');

class ShortService {
  async getShortInfo({ id, url, short }, where = {}) {
    const whereOpt = {};
    where && Object.assign(whereOpt, where);
    id && Object.assign(whereOpt, { id });
    url && Object.assign(whereOpt, { url });
    short && Object.assign(whereOpt, { short });
    const res = await ShortModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }
  async createShort(option) {
    const { short, url, password, userId } = option;
    const fieldOpt = { short, url };
    password && Object.assign(fieldOpt, { password });
    userId && Object.assign(fieldOpt, { userId });
    const res = await ShortModel.create(fieldOpt);
    return res ? res.dataValues : null;
  }
  async deleteShort(option) {
    const { id } = option;
    const res = await ShortModel.destroy({ where: { id } });
    return res;
  }
  async deleteExpireShort() {
    let expireTime = new Date().getTime() - SHORT_EXPIRT_TIME;
    const ret = await seq.transaction(async (transaction) => {
      try {
        const shorts = await ShortModel.findAll({ where: { create_time: { [Op.lt]: expireTime } }, transaction });
        await Promise.all(shorts.map(async ({ id, short }) => {
          await ShortModel.destroy({ where: { id }, transaction });
        }))
      } catch (error) {
        await transaction.rollback();
        throw error
      }
    })
    return ret
  }
  async updateShort({ visitCount }, id) {
    const fieldOpt = {};
    visitCount && Object.assign(fieldOpt, { visitCount })
    const res = await ShortModel.update(
      fieldOpt,
      { where: { id } }
    );
    return res;
  }
}

module.exports = new ShortService();
