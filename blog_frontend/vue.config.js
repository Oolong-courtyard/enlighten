module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'static': '@/static',
      }
    }
  },
  // 以下是pwa配置
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  // proxyTable: {     //axios跨域处理
  //   '/index': {       //此处并非和url一致
  //     target: 'http://106.15.8.3:8000/',
  //     changeOrigin: true, //允许跨域
  //     pathRewrite: {
  //       '^/index': ''
  //     }
  //   }
  // },
}

