const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { NativeFederationTypeScriptHost, NativeFederationTypeScriptRemote } = require('@module-federation/native-federation-typescript/webpack');
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;

const moduleFederationConfig = {
  name: "app4",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    "./App": "./src/App"
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:6005/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 6005,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(moduleFederationConfig),
    NativeFederationTypeScriptRemote({ moduleFederationConfig }),
    NativeFederationTypeScriptHost({ moduleFederationConfig }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
