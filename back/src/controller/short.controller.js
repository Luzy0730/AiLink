const ShortService = require('../service/short.service');


class ShortrController {
  // 创建短链
  async createShort(ctx, context) {
    const { short, url, password, userId } = ctx.request.body;
    try {
      const res = await ShortService.createShort({ short, url, password, userId });
      ctx.handleData(ctx, res);
    } catch (error) {
      console.log(error)
      ctx.handleError(ctx, error);
    }
  }

  // 短链解析
  async analysisShort(ctx, context) {
    const short = ctx.state.short;
    ctx.handleData(ctx, short.url);
  }

  // 获取短链列表
  async getShortList(ctx, context) {
    const { page, pageSize } = ctx.request.query
    const { userInfo } = ctx.request.body
    try {
      const short = await ShortService.getShortList({ page, pageSize, userId: userInfo.id })
      ctx.handleData(ctx, short);
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

  // 更新短链
  async updateShort(ctx, context) {
    const { status, isEver, id } = ctx.request.body
    try {
      const res = await ShortService.updateShort({ status, isEver }, id)
      ctx.handleData(ctx, res);
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

  // 删除短链
  async deleteShort(ctx, context) {
    const { id } = ctx.request.body
    try {
      const res = await ShortService.deleteShort({ id })
      ctx.handleData(ctx, res);
    } catch (error) {
      console.log(error);
      ctx.handleError(ctx, error);
    }
  }

}

module.exports = new ShortrController();
