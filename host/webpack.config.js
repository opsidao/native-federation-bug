const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { NativeFederationTypeScriptHost, NativeFederationTypeScriptRemote } = require('@module-federation/native-federation-typescript/webpack');
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;

const moduleFederationConfig = {
  name: "host",
  filename: "remoteEntry.js",
  remotes: {
    app1: "app1@http://localhost:6002/remoteEntry.js",
    app2: "app2@http://localhost:6003/remoteEntry.js",
    app3: "app3@http://localhost:6004/remoteEntry.js",
    app4: "app4@http://localhost:6005/remoteEntry.js",
  },
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
    publicPath: "http://localhost:6001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 6001,
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
    NativeFederationTypeScriptHost({ moduleFederationConfig }),
    new ModuleFederationPlugin(moduleFederationConfig),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
});
