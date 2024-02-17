const ShortModel = require('../model/short.model');
const seq = require('@/db/db_sequ');
const { Op, literal } = require('sequelize');
const rd = require('@/db/db_redis');
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
    const deletedRow = await ShortModel.findOne({ where: { id } });
    if (deletedRow) {
      await deletedRow.destroy();
      await rd.del(`short:${deletedRow.dataValues.short}`);
    }
    return deletedRow ? 1 : 0;
  }
  async deleteExpireShort() {
    let expireTime = new Date().getTime() - SHORT_EXPIRT_TIME;
    const ret = await seq.transaction(async (transaction) => {
      try {
        const shorts = await ShortModel.findAll({ where: { [Op.and]: [{ isEver: 0 }, { create_time: { [Op.lt]: expireTime } }] }, transaction });
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
  async updateShort({ visitCount, status, isEver }, id) {
    const fieldOpt = {};
    visitCount && Object.assign(fieldOpt, { visitCount })
    status !== undefined && Object.assign(fieldOpt, { status })
    isEver !== undefined && Object.assign(fieldOpt, { isEver })
    const updatedRow = await ShortModel.findOne({ where: { id } });
    if (isEver === 1) {
      const totalCount = await ShortModel.count({ where: { userId: updatedRow.dataValues.userId, isEver: 1 } });
      if (totalCount === 10) throw Error('至多允许设置10条永久短链')
    }
    if (updatedRow) {
      await updatedRow.update(fieldOpt);
      if (Object.keys(fieldOpt).length) {
        const shortRd = await rd.getObj(`short:${updatedRow.dataValues.short}`);
        if (shortRd) {
          Object.assign(shortRd, fieldOpt)
          await rd.setObj(`short:${updatedRow.dataValues.short}`, shortRd, SHORT_EXPIRT_TIME);
        }
      }
    }
    return updatedRow ? 1 : 0;
  }

  async getShortList({ page, pageSize, userId }) {
    let expireTime = new Date().getTime() - SHORT_EXPIRT_TIME;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const where = { userId, [Op.or]: [{ isEver: 1 }, { create_time: { [Op.gt]: expireTime } }] };
    const totalCount = await ShortModel.count({ where });
    const shorts = await ShortModel.findAll({ order: [[literal('isEver = 1'), 'DESC'], ['create_time', 'DESC']], where, offset, limit })
    return {
      total: totalCount,
      data: shorts,
    };
  }
}

module.exports = new ShortService();
