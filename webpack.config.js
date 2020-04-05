/** @format */

const path = require('path');
const webpack = require('webpack');
const rules = require('./webpack.rules.js');
const aliases = require('./webpack.aliases.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env) {
	const production = process.env.NODE_ENV === 'production';
	const test = (env && env.test) || null;
    let entry = './src/index.js';

	switch (test) {
		case 'unit':
			rules.push({
				test: /test\.js$/,
				use: 'mocha-loader',
				exclude: /node_modules/
			});
            entry = './src/test/auto.js';
            break;
        case 'manual':
            entry = './src/test/manual.js';
            break;
	}

	return {
        node: {
            fs: "empty"
        },
		mode: process.env.NODE_ENV || 'production',
		optimization: {
            minimize: production,
            minimizer: [
                // https://github.com/terser/terser#minify-options
                new TerserPlugin({
                    terserOptions: {
                        mangle: false,
                        extractComments: false
                    }
                }),
            ],
            removeAvailableModules: true,
            removeEmptyChunks: true,
            moduleIds: 'hashed',
            runtimeChunk: true,
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]|[\\/]lib[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
		entry: ['babel-polyfill', entry],
		output: {
			filename: 'index.js',
            chunkFilename: '[name].[contenthash].bundle.js',
			path: path.resolve(__dirname, 'dist/app')
		},
		resolve: {
			extensions: ['.js'],
			alias: aliases
		},
		module: {
			rules
		},
		plugins: [
			new CleanWebpackPlugin(['dist/app']),
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
