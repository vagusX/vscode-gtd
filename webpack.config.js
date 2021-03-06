const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const { WebpackPluginServe } = require('webpack-plugin-serve');

const isDevelopment = process.env.NODE_ENV !== 'production';

const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  watch: isDevelopment,
  mode: 'development',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  entry: [
    'webpack-plugin-serve/client',
    './web/main.tsx'
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
      configFile: path.resolve(__dirname, './tsconfig.web.json'),
    })],
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, './tsconfig.web.json'),
        compilerOptions: {
          jsx: 'react-jsxdev',
        },
        getCustomTransformers: () => ({
          before: isDevelopment ? [ReactRefreshTypeScript()] : [],
        }),
        // `ts-loader` does not work with HMR unless `transpileOnly` is used.
        // If you need type checking, `ForkTsCheckerWebpackPlugin` is an alternative.
        transpileOnly: true,
      },
    }],
  },
  plugins: isDevelopment ? [
    // ... other plugins
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
