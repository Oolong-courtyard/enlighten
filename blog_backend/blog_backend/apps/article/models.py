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
    category = models.CharField(max_length=100,
                                null=False,
                                default="python",
                                verbose_name="所属类别")
    author = models.CharField(max_length=50,
                              null=False,
                              verbose_name="作者")
    image = models.ImageField(upload_to='article_list', verbose_name='文章图片', null=True)

    class Meta:
        db_table = 'article_list'
        verbose_name = '文章列表'
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
    category = models.CharField(max_length=100,
                                null=False,
                                default="python",
                                verbose_name="所属类别")
    author = models.CharField(max_length=50,
                              null=False,
                              verbose_name="作者")
    content = models.TextField(verbose_name="文章详情内容")
    # image = models.ImageField(upload_to='article_detail', verbose_name='文章图片', null=True)
    image_url = models.CharField(max_length=500,
                                 null=True,
                                 verbose_name="图片链接")

    class Meta:
        db_table = 'article_detail'
        verbose_name = '文章详情'
        verbose_name_plural = verbose_name
