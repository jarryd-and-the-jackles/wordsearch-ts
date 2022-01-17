const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("webpack-dev-server");

const config = {
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : "nosources-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
  },
  entry: {
    wordsearch: "./src/index",
    app: {
      import: "./src/app",
      dependOn: [
        "wordsearch",
      ],
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    filename: "[name].bundle.js",
    clean: true,
    library: {
      type: "umd",
      name: "JJWordSearch",
    },
  },
  target: ["web", "es5"],
  stats: {
    errorDetails: true,
  },
  optimization: {
    minimize: true,
  },
  watch: false,
  context: path.resolve(__dirname),
  module: {
    rules: [
      {
        test: /\.ts(x?)$/i,
        use: [
          "ts-loader",
        ],
      },
      {
        test: /\.js$/i,
        use: [
          "babel-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname),
    ],
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./html/app.html",
      hash: true,
      minify: true,
    }),
  ],
};

module.exports = config;
