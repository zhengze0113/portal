const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const assetsPath = _path => path.resolve(__dirname, '../dist', _path);


module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../web/src/views/index/login.js'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../web')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: ('css/[name].[contenthash:8].css'),
      chunkFilename: ('css/[id].[contenthash:8].css')
    }),
    isProduction ? new CopyWebpackPlugin([
      { from: path.join(__dirname, '../web/static/images'), to: 'web/static/images' },
    ]) : '',
    isProduction ? new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }) : ''
  ].filter(Boolean),
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: isProduction ? assetsPath('') : '/',
    publicPath: '/'
  },
  devtool: isProduction ? '': 'source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data'
      }, {
        test: /\.s?css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: ('fonts/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: ('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: ('media/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          }
        },
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 9250,
    open: true,
    publicPath: '/'
  }
};
