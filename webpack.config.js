/** @format */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {
	const production = process.env.NODE_ENV === 'production';
	const test = env && env.test;

	//default entry point
	let entry = './src/index.js';
	//default rules:
	let rules = [
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

	switch (test) {
		case 'auto.browser':
			rules.push({
				test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
			})
		case 'auto.node':
			entry = './src/test/auto.js'
			break;
		case 'manual':
			entry = './src/test/manual.js'
	}

	return {
		mode: process.env.NODE_ENV || 'production',
		optimization: {
			minimize: production
		},
		entry: entry,
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
			rules: rules
		},
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
