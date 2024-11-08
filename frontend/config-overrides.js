const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    util: require.resolve("util/"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url/"),
    assert: require.resolve("assert/"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser.js"),  // Asegúrate de usar ".js"
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser.js',  // Asegúrate de usar ".js"
      Buffer: ['buffer', 'Buffer'],
    }),
  ]);

  if (env === 'development') {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
