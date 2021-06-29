"""
模型类补充字段
"""

from django.db import models


class BaseModel(models.Model):
    """为模型类补充字段"""
    created_time = models.DateTimeField(auto_now_add=True,
                                        verbose_name="创建时间")
    updated_time = models.DateTimeField(auto_now=True,
                                        verbose_name="更新时间")
    is_delete = models.BooleanField(verbose_name="是否被删除", default=False)

    class Meta:
        # 说明该类为抽象模型类,用于继承使用,数据库迁移时,不生成BaseModel的表
        abstract = True

    def pub_date(self):
        """定义模型方法,将创建时间展示到admin站点中"""
        return self.updated_time.strftime(
            '%Y年%m月%d日 %H时%M分%S秒'.encode('unicode_escape').decode('utf8')) \
            .encode('utf-8').decode('unicode_escape')

    # admin站点没有起作用?
    updated_time.short_description = '发布日期'
