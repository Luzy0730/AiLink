const { Sequelize } = require('sequelize');
const ShortModel = require('../model/short.model');
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
    const { short, url, password } = option;
    const fieldOpt = { short, url };
    password && Object.assign(fieldOpt, { password });
    const res = await ShortModel.create(fieldOpt);
    return res ? res.dataValues : null;
  }
  async deleteShort(option) {
    const { id } = option;
    const res = await ShortModel.destroy({ where: { id } });
    return res;
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
