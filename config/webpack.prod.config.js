const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js"); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中
const autoprefixer = require("autoprefixer");

const prodConfig = {
  mode: "production", // 生产模式
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../lib/"),
    filename: "fullpage.min.js",
    libraryTarget: "commonjs2", // 采用通用模块定义
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [
                autoprefixer({ browsers: ["> 0.15% in CN"] }),
              ],
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css", // 提取后的css的文件名
    }),
  ],
  externals: {
    // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
  },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
