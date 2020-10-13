"""
后台站点管理
"""

from django.contrib import admin
from .models import ArticleList, ArticleDetail

# 调整站点标题显示信息
admin.site.site_header = 'admin文章管理'
admin.site.site_title = '欢迎使用admin文章管理'
admin.site.index_title = '文章站点管理系统'


# 使用管理类方式二：装饰器
@admin.register(ArticleDetail)
class ArticleDetailAdmin(admin.ModelAdmin):
    """文章详情admin"""
    # 每页展示的行数
    list_per_page = 50


@admin.register(ArticleList)
class ArticleListAdmin(admin.ModelAdmin):
    """文章列表admin"""
    # 指定允许被修改的字段
    fields = ['summary', 'category', 'image']
    # 每页展示的行数
    list_per_page = 2
    # 决定列表页展示的字段有哪些
    list_display = ['article_id', 'article_name', 'pub_date']
    # 依照以下字段进行过滤
    list_filter = ['category', 'author']
    # 在admin站点当前页面最上面添加一个搜索按钮，可以按照指定model字段进行搜索，支持模糊查询
    search_fields = ['article_name', 'author']

# 使用管理类方式一：注册参数
# admin.site.register(ArticleDetail, ArticleDetailAdmin)
# admin.site.register(ArticleList, ArticleListAdmin)
