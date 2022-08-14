module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false,
    },
  },
  transpileDependencies: [
    'quasar',
  ],
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        changeOrigin: true,
        target: 'http://localhost:3000',
        headers: {
          Connection: 'keep-alive',
        },
        ws: true,
      },
    },
  },
}
