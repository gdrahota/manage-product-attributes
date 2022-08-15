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
    port: 9000,
    proxy: {
      '^/api': {
        changeOrigin: true,
        // target: 'http://127.0.0.1:8888',
        target: 'https://jellyfish-app-ksy6w.ondigitalocean.app/',
        headers: {
          Connection: 'keep-alive',
        },
        ws: true,
      },
    },
  },
}
