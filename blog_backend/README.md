### 需求分析与架构设计
```
# 1.(article_list)和(article_detail)冗余的字段太多;需要更多的表;
# 2.首页增加我的blog,支持发布新文章(markdown)并可以预览。这件事情更重要,实现之后
# 我可以用自己的网站写自己的知识点。
```
### BUG与待优化
```
# 1.自定义认证失败的异常捕获处理方式不恰当，后续优化
# 2.文章的内容(content)还是要单独分一张表。请求列表的时候，完全没有必要返回content呀，
详情再去请求，而且可以大大提高速度。
```
### （2021/06/21）代办事项
```
1. 搭建私有gitlab服务器，将项目代码加进去
5. 调查设置docker 最大存储容量

2. 学习搭建 jenkins，构建自动化部署步骤
3. 写一些测试代码
4. 跑CI/CD 后自动发布
6. 将日志系统集成到系统中
7. 开发Go后端
8. 开发machine learning
9. 学习 dockerignore gitignore gitkeep 等文件在项目中的正确用法
```
