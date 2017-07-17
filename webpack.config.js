var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var extractPlugin = new ExtractTextPlugin({
	filename: '[name].css',
	allChunks: true
})

module.exports = {
	entry: './src/jsx/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist',
		filename: 'bundle.js'
	},
	target: 'web',
	module:{
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'react', 
								'es2015', 
								// 'stage-1'
							]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: extractPlugin.extract({
					use: [
						'css-loader', 
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: 'inline',
							    plugins: function () {
							        return [autoprefixer('last 2 versions', 'ie 10', '>5%')]
							    }
							}
						},
						'sass-loader'
					]
				})
			}
		]
	},
	plugins: [
		extractPlugin
	]
}