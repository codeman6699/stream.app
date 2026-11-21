const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: "warning",
  productionSourceMap: false,
  filenameHashing: true,

  devServer: {
    port: 8080,
    allowedHosts: ["localhost", ".localhost"],
    host: "localhost",
    hot: true,
    client: {
      overlay: { errors: true, warnings: false },
      webSocketURL: "ws://localhost:8080/ws",
    },
    historyApiFallback: true,
    proxy: {
      "/api": { target: "http://localhost:3000", changeOrigin: true },
    },
  },

  configureWebpack: {
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    output: { chunkFilename: "js/[name].[contenthash:8].js" },
  },
});