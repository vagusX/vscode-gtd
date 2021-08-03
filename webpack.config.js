const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const { WebpackPluginServe } = require('webpack-plugin-serve');

const isDevelopment = process.env.NODE_ENV !== 'production';

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  watch: true,
  mode: 'development',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  entry: [
    'webpack-plugin-serve/client',
    './assets/main.tsx'
  ],
  output: {
    iife: false,
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, './tsconfig.assets.json'),
    })],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, './tsconfig.assets.json'),
        compilerOptions: {
          jsx: 'react-jsxdev',
        },
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: isDevelopment ? [ReactRefreshTypeScript()] : [],
        }),
        // `ts-loader` does not work with HMR unless `transpileOnly` is used.
        // If you need type checking, `ForkTsCheckerWebpackPlugin` is an alternative.
        transpileOnly: isDevelopment,
      },
    }],
  },
  plugins: isDevelopment ? [
    // ... other plugins
    // new webpack.HotModuleReplacementPlugin(),
    new WebpackPluginServe({
      host: '127.0.0.1',
      port: 8080,
      static: outputPath,
      status: false,
    }),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wps',
      },
    }),
  ] : [],
};
