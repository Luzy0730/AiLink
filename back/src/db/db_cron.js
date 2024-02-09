const cron = require('node-cron');
const redis = require('./db_redis')
const ShortService = require('@/service/short.service');
const { SHORT_EXPIRT_TIME } = require('@/config/config_default');

// 每小时整删除过期短链
cron.schedule('0 * * * *', async () => {
  console.log(`CRON:1h:清理过期短链:${new Date()}`)
  ShortService.deleteExpireShort()
  let expireTime = new Date().getTime() - SHORT_EXPIRT_TIME;
  redis.getKeys('short:*')
    .then((keys) => {
      keys.forEach(async (key) => {
        const shortInfo = await redis.getObj(key);
        if (expireTime > new Date(shortInfo.create_time)) {
          redis.del(key);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

// 每十分钟短链同步
cron.schedule('*/10 * * * *', async () => {
  console.log(`CRON:10min:短链同步中:${new Date()}`)
  redis.getKeys('short:*')
    .then((keys) => {
      keys.forEach(async (key) => {
        const shortInfo = await redis.getObj(key);
        ShortService.updateShort(
          { visitCount: shortInfo.visitCount },
          shortInfo.id
        );
      });
    })
    .catch((error) => {
      console.error(error);
    });
});