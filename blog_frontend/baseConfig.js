let baseConfig = {} //这里是一个默认的url，可以没有
switch (process.env.NODE_ENV) {
  case 'development':
    //TODO 这里改成自己的ip地址即可
    baseConfig.baseUrl = '' //这里是本地的请求url
    baseConfig.ip1 = 'http://192.168.201.185:9527'
    baseConfig.ip2 = 'http://192.168.201.185:9527'
    // baseConfig.domain = "https://ait.ohsyun.com/";
    break
  case 'production':
    baseConfig.baseUrl = '' //生产环境url
    baseConfig.ip1 = 'http://192.168.201.185:9527'
    baseConfig.ip2 = 'http://192.168.202.68:3000'
    // baseConfig.domain = "https://ait.ohsyun.com/";
    break
}

export default baseConfig
