const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // GitHub Pages publica la página en /front-afterschool/
  publicPath: process.env.NODE_ENV === 'production' ? '/front-afterschool/' : '/',
  productionSourceMap: false,
  // todos los archivos de dist quedan en una sola carpeta (más fácil de subir a GitHub)
  configureWebpack: {
    output: { filename: '[name].[contenthash:8].js', chunkFilename: '[name].[contenthash:8].js' }
  },
  css: { extract: { filename: '[name].[contenthash:8].css', chunkFilename: '[name].[contenthash:8].css' } },
  chainWebpack: config => {
    config.module.rule('images').set('generator', { filename: '[name].[hash:8][ext]' })
  }
})
