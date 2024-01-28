const Redis = require('ioredis');
const cron = require('node-cron');
const UserService = require('../service/user.service');
const ShortService = require('../service/short.service');

// 创建Redis客户端对象
const redisClient = new Redis({
  host: 'localhost', // Redis服务器主机名或IP地址
  port: 6379, // Redis服务器监听的端口号
  password: 'Lzy@960730',
  db: 0,
});

cron.schedule('*/10 * * * *', async () => {
  // 这里是你要执行的任务代码
  console.log('短链同步中...');
  await getKeys('short:*')
    .then((keys) => {
      keys.forEach(async (key) => {
        const shortInfo = await getObj(key);
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

// 获取所有keys
async function getKeys(reg) {
  let cursor = '0';
  const scanParams = reg ? [cursor, 'MATCH', reg] : [cursor];
  const keys = [];
  do {
    const [newCursor, newKeys] = await redisClient.scan(...scanParams);
    cursor = newCursor;
    keys.push(...newKeys);
  } while (cursor !== '0');
  return keys;
}

async function getObj(key) {
  return redisClient.get(key).then((res) => JSON.parse(res));
}

async function setObj(key, value) {
  return redisClient.set(key, JSON.stringify(value));
}

redisClient.getObj = getObj
redisClient.setObj = setObj

module.exports = redisClient