const path = require('path');
const CracoLessPlugin = require('craco-less');
const CracoEnvPlugin = require('craco-plugin-env')
const CompressionPlugin = require('compression-webpack-plugin');

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
    configure: (webpackConfig) => {
      // 对于分割代码块进行配置
      webpackConfig.optimization.splitChunks = {
        cacheGroups: {
          main: {
            name: "main",
            chunks: "all",
            minChunks: 2, // 至少被两个模块引入
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
      // 对于异步模块进行配置
      webpackConfig.optimization.runtimeChunk = {
        name: 'runtime',
      };

      webpackConfig.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // Only assets larger than 10kb will be compressed
          minRatio: 0.8 // Only assets that compress better than 80% will be compressed
        })
      );
      return webpackConfig;
    },
    alias: {
      '@': pathResolve('src'),
      component: pathResolve('src/components'),
      utils: pathResolve('src/utils'),
      assets: pathResolve('src/assets'),
    },
  },
};
