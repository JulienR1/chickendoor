const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	entry: ["babel-polyfill", "./src/app.ts"],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				include: [path.resolve(__dirname), path.resolve(__dirname, "../shared")],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
		alias: {
			"@root": path.resolve(__dirname, "src"),
			"@shared": path.resolve(__dirname, "../shared/dist"),
		},
	},
	output: {
		filename: "app.js",
		path: path.resolve(__dirname, "dist"),
	},
	target: "node",
	externals: [nodeExternals()],
};
