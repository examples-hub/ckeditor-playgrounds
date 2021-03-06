const path = require('path');
const webpack = require('webpack');
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  performance: { hints: false },

  // entry: path.resolve(__dirname, 'minimal', 'app.js'),
  entry: path.resolve(__dirname, 'src', 'index.js'),

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new CKEditorWebpackPlugin({
      language: 'en',
      additionalLanguages: ['en', 'zh-cn','zh'],
      // language: 'en',
      // addMainLanguageTranslationsToAllAssets: true,
      verbose: true,
      packageNamesPattern: /[/\\]ckeditor[^/\\]+[/\\]/,
      // packageNamesPattern: /^ckeditor/,
      sourceFilesPattern: /[/\\]ckeditor[^/\\]+[/\\]src[/\\].+\.js$/,
      // sourceFilesPattern: /^ckeditor[^/\\]+[/\\]src[/\\].+\.js$/,
    }),
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true,
    }),

    new HtmlWebpackPlugin({
      // template: path.resolve(process.cwd(), 'demo.html'),
      template: './public/index.html',
      // template: './public/simple-box.html',
      // template: './public/simple-img.html',
      // filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
              },
              minify: true,
            }),
          },
        ],
      },
    ],
  },

  devServer: {
    // ????????????????????????????????????cli????????? --hot
    contentBase: path.resolve(__dirname, '../dist'),
    // open: true,
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8999,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
