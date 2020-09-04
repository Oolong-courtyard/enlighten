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

    class Meta:
        # 说明该类为抽象模型类,用于继承使用,数据库迁移时,不生成BaseModel的表
        abstract = True
