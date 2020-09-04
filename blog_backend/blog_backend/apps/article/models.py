"""
文章模型类
"""

from django.db import models
from blog_backend.utils.models import BaseModel


class ArticleList(BaseModel):
    """
    文章列表
    """
    article_id = models.CharField(max_length=100,
                                  null=False,
                                  verbose_name="文章id")
    article_name = models.CharField(max_length=100,
                                    null=False,
                                    verbose_name="文章标题")
    summary = models.CharField(max_length=200,
                               null=True,
                               verbose_name="文章摘要")
    author = models.CharField(max_length=50,
                              null=False,
                              verbose_name="作者")

    class Meta:
        db_table = 'article_list'
        verbose_name = '商品SKU'
        verbose_name_plural = verbose_name


class ArticleDetail(BaseModel):
    """
    文章详情
    """
    article_id = models.CharField(primary_key=True,
                                  max_length=100,
                                  null=False,
                                  verbose_name="文章id")
    article_name = models.CharField(max_length=100,
                                    null=False,
                                    verbose_name="文章标题")
    summary = models.CharField(max_length=200,
                               null=True,
                               verbose_name="文章摘要")
    author = models.CharField(max_length=50,
                              null=False,
                              verbose_name="作者")
    content = models.TextField(verbose_name="文章详情内容")
    image_url = models.CharField(max_length=500,
                                 null=True,
                                 verbose_name="图片链接")

    class Meta:
        db_table = 'article_detail'
        verbose_name = '商品SKU'
        verbose_name_plural = verbose_name
