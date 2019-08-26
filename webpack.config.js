/** @format */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {
	const production = process.env.NODE_ENV === 'production';
	const test = env && !!env.test;
	const node_test = env && !!env.node_test;

	return {
		mode: process.env.NODE_ENV || 'development',
		optimization: {
			minimize: production
		},
		entry: './src/index.js',
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		resolve: {
			extensions: ['.js'],
			alias: {
				'@app': path.resolve(__dirname, './src/'),
				'@core': path.resolve(__dirname, './src/core'),
				'@test': path.resolve(__dirname, './src/test'),
				'@lib': path.resolve(__dirname, './lib/'),
				'@res': path.resolve(__dirname, './res/')
			}
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: /node_modules|lib/,
					loader: 'eslint-loader',
					options: {
						fix: false
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				}
			]
		},
		//Dev server {
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				title: 'teplate'
			}),
			new CopyWebpackPlugin([{ from: './res/', to: 'res' }]),
			new webpack.ProvidePlugin({
				cgn: [path.resolve(path.join(__dirname, 'src/core/core_namespace.js')), 'default'] //global game object
			})
		],
		devtool: production ? false : 'inline-source-map'
	};
};
