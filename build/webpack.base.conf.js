const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: {
		index: path.resolve(__dirname, '../src/main.js'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, '../src'),
			'@img': path.resolve(__dirname, '../src/assets/img'),
			vue: 'vue/dist/vue.js',
		},
	},
	target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf|orf|otf)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'font/[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					'eslint-loader',
				],
			},
			{
				test: /\.vue$/i,
				loader: 'vue-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../src/index.html'),
			chunks: ['index'],
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new PurgecssPlugin({
			paths: glob.sync(`${path.resolve(__dirname, '../src')}/**/*`, {
				nodir: true,
			}),
		}),
		new Dotenv({
			path: path.resolve(__dirname, '../.env'),
		}),
	],
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendors',
					priority: 20,
					enforce: true,
				},
				common: {
					chunks: 'initial',
					minSize: 0,
					name: 'common',
					minChunks: 2,
					priority: 10,
				},
			},
		},
	},
};
