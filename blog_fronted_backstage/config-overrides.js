//ant design 按需加载

const path = require("path")
const { override, addWebpackAlias, fixBabelImports, addLessLoader } = require("customize-cra")

module.exports = override(
    addWebpackAlias({
        //增加路径别名的处理
        "@/assets": path.resolve("./src/assets"),
    }),
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
    }),
    addLessLoader({
        // true 表示支持 less 样式文件格式
        javascriptEnabled: true,
    })
)
