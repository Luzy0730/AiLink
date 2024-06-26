const UserModel = require('../model/user.model');

class userService {
  async getUserInfo({ id, username }, where = {}) {
    const whereOpt = {};
    where && Object.assign(whereOpt, where);
    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    const res = await UserModel.findOne({ where: whereOpt });
    return res ? res.dataValues : null;
  }
  async register(option) {
    const { username, password, id } = option;
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    const fieldOpt = id ? { password } : { username, password };
    const res = await UserModel[id ? 'update' : 'create'](fieldOpt, { where: whereOpt });
    return res ? res.dataValues : null;
  }
}

module.exports = new userService();
