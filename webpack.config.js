const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("webpack-dev-server");

const config = {
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : "nosources-source-map",
  devServer: {
    contentBase: "./dist"
  },
  entry: {
    wordsearch: {
      import: "./src/index",
      library: {
        name: ["WordSearchCreator", "WordSearch"],
        export: ["WordSearchCreator", "WordSearch"],
        type: "umd",
      },
    },
    app: {
      import: "./src/app",
      dependOn: [
        "wordsearch",
      ]
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  target: "web",
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
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
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
    extensions: [".js", ".scss", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./html/app.html",
      hash: true,
      minify: true
    }),
  ],
};

module.exports = config;
