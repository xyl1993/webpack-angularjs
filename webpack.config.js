var webpack = require('webpack');
var path = require('path');

// var precss = require('precss');
// var cssnext = require('cssnext');
// var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');
var publicPath = 'http://localhost:3000/dist/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//css样式从js文件中分离出来,需要通过命令行安装 extract-text-webpack-plugin依赖包
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BOWER_PATH = path.resolve(ROOT_PATH, 'bower_components');
var TEM_PATH = path.resolve(ROOT_PATH, 'views/template');

module.exports = {
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        port:3000 //端口你可以自定义
    },
    entry: {
        build: [SRC_PATH + '/main.js',hotMiddlewareScript],//,SRC_PATH + '/router/index.js''
        vendor: [
                    BOWER_PATH+'/bootstrap/dist/js/bootstrap.min.js',
                    BOWER_PATH+'/angular/angular.js',
                    BOWER_PATH+'/angular/angular-ui-router.js',
                    BOWER_PATH+'/angular/angular-sanitize.min.js',
                    BOWER_PATH+'/angular/angular-resource.min.js',
                    BOWER_PATH+'/angular/angular-datatables.min.js'
                ]
    },
    output: {
        path: path.resolve(ROOT_PATH, './public/dist'),
        publicPath: publicPath,
        filename: '[name].js'
    },
    module: {
        loaders: [/*{
            test: /\.jsx?$/,
            loader: 'babel',
            include: PUB_PATH,
            query: {
                presets: [
                    ["es2015"]
                   
                  ],
            }
        }, */
        //解析.css文件
        { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader")},    
        //解析.scss文件,对于用 import 或 require 引入的sass文件进行加载，以及<style lang="sass">...</style>声明的内部样式进行加载
        {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'//ExtractTextPlugin.extract("style", 'css!sass')
        },
        {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },
        { 
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                limit: 5000,
                // 路径要与当前配置文件下的publicPath相结合
                name:'./images/[name].[ext]?[hash:7]'
            }
        },
　　　　{test: /\.html$/, loader: 'raw'},
        { 
            test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
            loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]' 
        }
        ]
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    devtool: 'eval-source-map',
    resolve: {
      // require时省略的扩展名，如：require('module') 不需要module.js
      extensions: ['', '.js', '.vue','.css'],
      // 别名，可以直接使用别名来代表设定的路径以及其他
      alias: {
          
      }
    },
    // postcss: function() {
    //   return [autoprefixer, cssnext, precss, cssnano]
    // },
    plugins: [
        new ExtractTextPlugin("./style.css"),  // 开发
        //new ExtractTextPlugin("style.css"), //提取出来的样式放在style.css文件中
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
        // new webpack.ProvidePlugin({
        //   $: "jquery",
        //   jQuery: "jquery"
        // })
    ]
}
