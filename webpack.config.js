const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const isDevelopment = process.env.NODE_ENV !== 'production';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  node_modules: path.join(__dirname, 'node_modules'),
  src: path.join(__dirname, 'src')
};

module.exports = {
  entry: {
    entry: ['@babel/polyfill','whatwg-fetch', path.join(PATHS.src, 'index')],
  } ,

  output: {
    path: PATHS.dist,
    filename: 'pf.authn-widget.js',
    library: 'PfAuthnWidget',
    publicPath: '/',
    sourceMapFilename: 'pf.authn-widget.map',
    libraryTarget: 'umd'
  },
  devtool: isDevelopment && "source-map",
  mode: !isDevelopment ? "production" : "development",
  module: {
    rules: [
      { test: /\.handlebars$/, loader: "handlebars-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
              minimize: !isDevelopment
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              sourceMap: isDevelopment,
              plugins: () => [
                autoprefixer
              ]
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: 'static/',
              useRelativePath: true,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {}
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-styles.css",
      chunkFilename: "[id].css"
    }),
    // new BundleAnalyzerPlugin(),
  ]
};
