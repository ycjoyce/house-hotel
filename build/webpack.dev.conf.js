const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		open: true,
		host: '0.0.0.0',
		useLocalIp: true,
		port: '5000',
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'img/[name].[ext]',
							limit: 8192,
							esModule: false,
						},
					},
				],
			},
			{
				test: /\.s?[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [
									require('autoprefixer'),
								],
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
});
