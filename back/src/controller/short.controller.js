const ShortService = require('../service/short.service');
class ShortrController {
  // 创建短链
  async createShort(ctx, context) {
    const { short, url, password, userId } = ctx.request.body;
    try {
      const res = await ShortService.createShort({ short, url, password, userId });
      ctx.handleData(ctx, res);
    } catch (error) {
      ctx.handleError(ctx, error);
    }
  }

  // 短链解析
  async analysisShort(ctx, context) {
    const short = ctx.state.short;
    ctx.handleData(ctx, short.url);
  }
}

module.exports = new ShortrController();
