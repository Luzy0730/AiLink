const ShortModel = require('../model/short.model');
class ShortService {
  async getShortList() {
    const res = await ShortModel.findAll();
    return res;
  }
  async getShortById(id) {
    const res = await ShortModel.findOne({ where: { id } });
    return res;
  }
  async getShortInfo({ id, url, short }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    url && Object.assign(whereOpt, { url });
    short && Object.assign(whereOpt, { short });
    const res = await ShortModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }
  async createShort(option) {
    const { short, url } = option;
    const res = await ShortModel.create({ short, url });
    return res;
  }
}

module.exports = new ShortService();
