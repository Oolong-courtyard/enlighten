//这是项目发布阶段用到的 babel 插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // ...prodPlugins,
  ]
}
