const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevMode = argv.mode === 'development';

  return {
    mode: isDevMode ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          use: [
            {
              loader: "handlebars-loader",
              options: {
                partialDirs: [
                  path.join(__dirname, 'src', 'partials'),
                ],
              },
            },
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'guide.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'posts.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'store.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: '' }
        ]
      }),
      new MiniCssExtractPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      port: 8000,
      historyApiFallback: {
        index: 'index.html',
      },
    },
  };
};