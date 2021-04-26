const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

require("webpack-dev-server");

const config = {
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  devtool: process.env.NODE_ENV !== "production" ? "eval-source-map" : "inline-nosources-source-map",
  devServer: {
    contentBase: "./dist"
  },
  entry: {
    wordsearch: "./src/index.ts",
    app: {
      import: "./src/app.ts",
      dependOn: [
        "wordsearch",
      ]
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    library: {
      type: "umd",
    }
  },
  target: ["web", "es5"],
  optimization: {
    minimize: true,
  },
  watch: false,
  context: __dirname,
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
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: false,
            projectReferences: true,
          },
        },
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname),
    ],
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    plugins: [
      new TsconfigPathsPlugin({
        logLevel: "info",
        mainFields: "module",
        extensions: [".js", ".ts", ".tsx"],
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
        <html lang="en">
          <body>
            <h1>Word Search Demo App</h1>
            <div id="wordsearch-container"></div>
          </body>
        </html>
      `,
      minify: true,
      title: "Word Search Demo App"
    }),
  ],
};

module.exports = config;
