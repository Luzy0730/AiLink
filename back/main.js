require('module-alias/register')

const app = require('./src/app/index');

const { APP_PORT } = require('./src/config/config_default');

app.listen(APP_PORT, () => {
  console.log(`start at ${APP_PORT}`);
});
