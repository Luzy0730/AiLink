const path = require('path');
const CracoLessPlugin = require('craco-less');
const CracoEnvPlugin = require('craco-plugin-env')
const pathResolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: {}
      }
    }
  ],
  webpack: {
    alias: {
      '@': pathResolve('src'),
      component: pathResolve('src/components'),
      utils: pathResolve('src/utils'),
      assets: pathResolve('src/assets'),
    },
  },
};
