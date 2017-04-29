const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].bundle.css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

module.exports = function webpackConfig() {
  
  let  config = {};

  config.context = path.resolve(__dirname, './src');

  config.entry = isTest ? void 0 : {
    app: './app/app.js'
  };

  config.output = isTest ? {} : {
    path: path.resolve(__dirname, './dist'),
    filename: isProd ? '[name].[hash].js' : '[name].[chunkhash].js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].js',
    publicPath: isProd ? './' : 'http://localhost:8080/'
    
  };

  config.devServer = {
    contentBase: path.resolve(__dirname, './src'),
  };

  if (isTest) {
    config.devtool = 'inline-source-map';
  }

  if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval';
  }

  config.module = {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      use: [
        { loader: 'babel-loader'},
        // { loader: 'ng-annotate-loader'}
      ]
    },{
      test: /\.styl$/,
      include: path.resolve(__dirname, 'src'),
      loader: extractCSS.extract(['css-loader', 'stylus-loader']),
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=img/[name].[ext]?'
    },{
      test: /\.(woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/[name].[ext]?'
    },{
      test: /\.html$/,
      loader: 'raw-loader'
    }
    ]
  };

  config.plugins = [
    extractCSS,
    new ngAnnotatePlugin({
      add: true
    })
  
  ];

  if (!isTest) {
    
    config.plugins.push(
      new HtmlWebpackPlugin({
      title: 'CompuCorp Test',
      template: 'indexP.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'manifest',
      filename: 'mainfest.js'
    }))
  }

  if (isProd) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    );
  }

  return config;
}();
