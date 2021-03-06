const prod = process.env.REACT_APP_NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
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
		],
	},
	devtool: prod ? undefined : "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: "index.html",
		}),
	],
	resolve: {
		alias: {
			"@shared": path.resolve(__dirname, "../shared"),
		},
	},
};
