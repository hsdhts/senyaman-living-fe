const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = defineConfig ({
  transpileDependencies: true,
  css: {
    extract: true, // Extract CSS to a file for better caching
    sourceMap: false,
    loaderOptions: {
      css: {
        // Customizations
      },
    },
  },
  configureWebpack: {
    optimization: {
      minimize: true, // Enable minification
    },
  },
});
