const path = require('path');
const CracoLessPlugin = require('craco-less');

const pathResolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
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
