/*
* @Author: Administrator
* @Date:   2018-06-01 11:00:50
* @Last Modified by:   windows
* @Last Modified time: 2018-06-11 08:19:32
*/
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
//环境变量的配置。dev与online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
			template: './src/view/'+name+'.html',
			filename: 'view/'+name+'.html',
			inject	: true,
			hash 	: true,
			chunks	: ['common',name]
	}
}
//webpack config
config = {
	entry:{
		'common': ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/login.js']
	},
	output:{
		// 最终生成文件的位置
		path:__dirname + '/dist',
		// 访问文件的地址,这个是相对访问地址localhost:8000/dist
		publicPath:'/dist',
		filename:'js/[name].js'
	}
	,
	externals:{
		'jquery':'window.jQuery'
	},
	module:{
		loaders: [
			{test: /\.css$/, loader : ExtractTextPlugin.extract('css-loader','style-loader')},
			{test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}

		]
	},
	plugins:[
		// 独立通用模块打包
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}),
		// css 模块单独打包
		new ExtractTextPlugin("css/[name].css"),
		//html 模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]

};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8000')
}
module.exports=config;