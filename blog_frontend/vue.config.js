// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//TODO 如何做配置文件的隔离？

// if (isProduction) {
//   打包后去掉代码中的console.log
//   config.plugins.push(
//     new UglifyJsPlugin({
//       uglifyOptions: {
//         //生产环境去除console等信息
//         compress: {
//           warnings: false, // 若打包错误，则注释这行
//           drop_debugger: true,//是否移除debugger
//           drop_console: true,
//           pure_funcs: ['console.log']//移除console
//         }
//       },
//       parallel: true
//     })
//   )
// }

module.exports = {
  baseUrl: '/',//打包后的位置(如果不设置这个静态资源会报404)
  outputDir: 'dist',//打包后的目录名称
  assetsDir: 'static',//静态资源目录名称
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'static': '@/static',
        'images': '@/images',
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
  //打包的时候去除map文件(map文件的作用:prod下可以看到具体的哪一行的代码错误信息)
  //设置为false后可以大大减少打包后文件的体积
  productionSourceMap: false,


}

