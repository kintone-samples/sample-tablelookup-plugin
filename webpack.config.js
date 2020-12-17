const path = require('path');

const options = {
  entry: {
    main: path.resolve('plugin/js/desktop/index.js'),
    config: path.resolve('plugin/js/pluginConfig/index.js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: ["web", "es5"],
  output: {
    path: path.resolve('plugin/dist'),
    filename: '[name].min.js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 10000000,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    options.devtool = 'source-map';
    options.watch = true;
  }

  if (argv.mode === 'production') {
    // ...
  }
  return [options];
};
