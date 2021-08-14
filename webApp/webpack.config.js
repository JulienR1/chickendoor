const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
	const envPath = path.join(__dirname, `/.env.${process.env.NODE_ENV}`.trim());
	const env = dotenv.config({ path: envPath }).parsed;

	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});

	return {
		mode: prod ? "production" : "development",
		entry: "./src/index.tsx",
		output: {
			path: __dirname + "/dist/",
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					resolve: {
						extensions: [".ts", ".tsx", ".js", ".json"],
					},
					use: "ts-loader",
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						"style-loader",
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
							},
						},
						"postcss-loader",
						"sass-loader",
					],
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
			],
		},
		devtool: prod ? undefined : "source-map",
		plugins: [
			new webpack.DefinePlugin(envKeys),
			new HtmlWebpackPlugin({
				template: "index.html",
			}),
		],
		resolve: {
			alias: {
				"@shared": path.resolve(__dirname, "../shared"),
				"@root": path.resolve(__dirname, "src"),
			},
		},
	};
};
