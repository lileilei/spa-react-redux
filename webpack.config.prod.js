var path = require('path')
var webpack = require('webpack')
var fs =require('fs')
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index:'./index'
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "output.[hash].bundle.js",
    chunkFilename: "[id].[hash].bundle.js" //给require.ensure用
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new ExtractTextPlugin("[hash].min.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super','exports', 'require']
      }
    }),
    assetsPluginInstance,
    function(){
      this.plugin("done", function(stats) {
        fs.readFile('./webpack-assets.json','utf-8',function(err,data){
          fs.readFile('./view/index.html','utf-8',function(err,html){
            var HTML=html.replace(/<script.+?file="(.*?)">/gi,function(match, $1){
              return '<script src="'+JSON.parse(data)[$1].js+'">';
            });
            HTML = HTML.replace(/<link.+?file="(.*?)">/gi,function(match,$1){
              return '<link rel="stylesheet" href="'+JSON.parse(data)[$1].css+'">'
            });
            fs.writeFile('./index.html',HTML);
          });
        })
      });
    }
  ],
  module: {
    externals:{

    },
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {test: /\.css$/, loader:ExtractTextPlugin.extract("style-loader", "css!autoprefixer")},
      {test: /\.scss$/i, loader: ExtractTextPlugin.extract("style-loader", "css!sass!autoprefixer")},
      {test: /\.less$/i, loader: ExtractTextPlugin.extract("style-loader", "css!less!autoprefixer")},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
}
