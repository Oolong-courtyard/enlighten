"""
文章模型类
"""
from django.contrib.postgres.fields import ArrayField
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
    # image = models.ImageField(upload_to='article_list', verbose_name='文章图片',
    #                           null=True, max_length=500)
    image = models.TextField(verbose_name='文章图片', null=True, max_length=500)
    origin = models.CharField(null=True, max_length=100, verbose_name="爬取于")
    scraped_date_time = models.DateTimeField(auto_now=True, verbose_name="爬取时间")

    class Meta:
        db_table = 'article_list'
        verbose_name = '文章列表'
        verbose_name_plural = verbose_name
        ordering = ['article_id']  # 指定默认排序字段


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
    tags = ArrayField(base_field=models.CharField(max_length=50), null=True, blank=True, verbose_name="标签")
    content = models.TextField(verbose_name="文章详情内容")
    # image = models.ImageField(upload_to='article_detail', verbose_name='文章图片', null=True)
    image_url = models.TextField(max_length=500,
                                 null=True,
                                 verbose_name="图片链接")

    class Meta:
        db_table = 'article_detail'
        verbose_name = '文章详情'
        verbose_name_plural = verbose_name
