const ShortService = require('../service/short.service');
class ShortrController {
  async getShortList(ctx, context) {
    const res = await ShortService.getShortList();
    ctx.handleData(ctx, res);
  }
  async getShortById(ctx, context) {
    const { id } = ctx.request.query;
    if (!id) {
      return ctx.handleData(ctx, null, 400, '缺少参数id');
    }
    const res = await ShortService.getShortById(id);
    ctx.handleData(ctx, res);
  }
  async craeteShort(ctx, context) {
    const { short, url } = ctx.request.body;
    try {
      const res = await ShortService.createShort({ short, url });
      ctx.handleData(ctx, res);
    } catch (error) {
      ctx.handleData(ctx, error);
    }
  }
}

module.exports = new ShortrController();
