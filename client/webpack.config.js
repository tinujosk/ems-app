const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3002',
        pathRewrite: { '^/api': '' },
      }
    ],
    historyApiFallback: { index: "index.html" },
    open: true,
    port: 3003,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "EMS Application",
      template: "template_index.html",
      filename: "./index.html",
    }),
  ],
  mode: "development",
};

module.exports = () => {
  return config;
};
