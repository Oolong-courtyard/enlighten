# enlighten
a blog which Web side developed by Django and Vue and the Mobile Terminal developed by react-native.

### 网站已经发布

目前做了一点交互，可以通过域名访问 http://enlighten.top 

### (2021/06/29) 系统组件通用规则
```
1、日志的记录。每个服务以具体到 `日` 为文件夹,日志等级 ERROR/INFO 为文件区分,秉承的原则就是能够快速定位到 某个服务某天的日志信息。
在部署服务时尤其注意log文件目录的挂载。此外有条件可以使用可视化日志收集系统（ELK、PLG）
2、参数校验、业务逻辑处理、数据库交互、全局异常处理、响应参数的格式统一
3、使用的包/库的版本需要保持强一致性；否则线上极容易出错。
```