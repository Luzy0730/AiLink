const app = require('./app/index');

const { APP_PORT } = require('./config/config_default');

app.listen(APP_PORT, () => {
  console.log(`start at ${APP_PORT}`);
});
