import * as path from 'path';
import * as webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  watch: true,
  mode: 'development',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  entry: './assets/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({
      configFile: './assets/tsconfig.json',
    })],
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'ts-loader' }],
  },
};

export default config;