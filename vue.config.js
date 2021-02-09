const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")

const webpack = require("webpack");

function getProdExternals() {
  return {
    'monaco-editor-vue': "monaco-editor-vue",
  };
}


module.exports = {
  // modify dev page
  pages: {
    index: {
      // dev entry
      entry: 'example/main.js',
      template: 'example/public/index.html',
      filename: 'index.html',
    },
  },
  css: { extract: false },
  configureWebpack: {
    // exclude monaco-editor to reduce lots of size
    externals: process.env.NODE_ENV === 'production' ?
      getProdExternals() : {}
  },
  chainWebpack: (config) => {
    config.plugin("monaco-editor").use(MonacoWebpackPlugin, [
      {
        // Languages are loaded on demand at runtime
        // https://github.com/FE-Mars/monaco-editor-vue
        languages: ["json", "typescript", "javascript", "html", "xml"],
      },
    ])
  },
}
