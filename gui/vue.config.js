module.exports = {
  devServer: {
    port: 8082,
    proxy: {
      '^/api': {
        changeOrigin: true,
        target: 'http://localhost:8888',
        headers: {
          Connection: 'keep-alive',
        },
        ws: true,
      },
    },
  },
}
