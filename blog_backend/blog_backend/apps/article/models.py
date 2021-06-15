"""
文章模型类
"""
from django.contrib.postgres.fields import ArrayField
from django.db import models

from utils.models import BaseModel

"""
如何分表的问题,不同页面跳转直接的共同数据共享的问题？？
"""
"""
关系型数据库表结构设计的三范式:
1.(第一范式）：确保每列的原子性。合理遵循第一范式需要根据实际的业务。
比如 通常情况下`地址`这个字段可以只设置成一个字段,但是有些时候需要单独获取地址中的城市，这种情况下就需要把地址拆分为 `省份 城市 详细地址`,这样在需要单独获取 城市 的值的时候就非常方便。
2.(第二范式)：确保表中的每列都和主键相关。此时需要合理设计表中的字段，保证每个字段都与主键相关；如果表述`一个业务`需要联合主键，那么就应当对主键进行拆分。
比如:订单相关表，其中订单编号和商品编号作为该业务表的联合主键，但是像 商品名称 商品价格 等与商品相关但与订单无关的表字段出现在该表中，违反了第二范式。
3.(第三范式)：确保每列都和主键直接相关而不是间接相关。
比如：订单相关表，其中客户编号与订单编号直接相关，可以作为该表的一个字段；但是像 客户名称 客户电话 等与订单不直接相关的属性应该单独存放在另外一张表中。
"""
"""
数据库设计原则与建议：
1. 不应该对整个系统进行数据库设计，而应该根据系统架构的组件划分，针对每个组件所处理的业务进行组件单元的数据库设计；
2. 采用自顶向下的思路进行数据库设计，首先分析系统业务，根据职责定义对象。对象要符合封装的特性，确保与职责相关的数据项被定义在一个对象中；
3.
"""
"""
表结构和业务设计一定要具有可拓展性和非耦合性。
"""


# 评论表
class Comment(BaseModel):
    """
    评论表
    """
    id = models.IntegerField()


# 文章列表
class ArticleList(BaseModel):
    """
    文章列表
    """
    article_id = models.CharField(max_length=100, null=False, verbose_name="文章id")
    article_name = models.CharField(max_length=100, null=False, verbose_name="文章标题")
    summary = models.CharField(max_length=200, null=True, verbose_name="文章摘要")
    category = models.CharField(max_length=100, null=False, default="python", verbose_name="所属类别")
    author = models.CharField(max_length=50, null=False, verbose_name="作者")
    # image = models.ImageField(upload_to='article_list', verbose_name='文章图片',
    #                           null=True, max_length=500)
    image = models.TextField(verbose_name='文章图片', null=True, max_length=500)
    origin = models.CharField(null=True, max_length=100, verbose_name="爬取于")
    content = models.TextField(verbose_name="文章详情内容", null=True, blank=True)
    scraped_date_time = models.DateTimeField(auto_now=True, verbose_name="爬取时间")
    publish_time = models.CharField(null=True, max_length=50, verbose_name="发布时间")
    star_count = models.IntegerField(null=True, default=0, verbose_name="点赞数")
    comment_count = models.IntegerField(null=True, default=0, verbose_name="评论数")

    class Meta:
        db_table = 'article_list'
        verbose_name = '文章列表'
        verbose_name_plural = verbose_name
        ordering = ['-publish_time']  # 指定默认排序字段


# 文章详情
class ArticleDetail(BaseModel):
    """
    文章详情
    """
    article_id = models.CharField(max_length=100, null=False, verbose_name="文章id")
    article_name = models.CharField(max_length=100, null=False, verbose_name="文章标题")
    summary = models.CharField(max_length=200, null=True, blank=True, verbose_name="文章摘要")
    category = models.CharField(max_length=100, null=False, default="python", verbose_name="所属类别")
    author = models.CharField(max_length=50, null=False, verbose_name="作者")
    tags = ArrayField(base_field=models.CharField(max_length=50), null=True, blank=True, verbose_name="标签")
    content = models.TextField(verbose_name="文章详情内容", null=True, blank=True)
    publish_time = models.CharField(null=True, max_length=50, verbose_name="发布时间")
    # image = models.ImageField(upload_to='article_detail', verbose_name='文章图片', null=True)
    image_url = models.TextField(max_length=500, null=True, verbose_name="图片链接")
    star_count = models.IntegerField(null=True, default=0, verbose_name="点赞数")
    comment_count = models.IntegerField(null=True, default=0, verbose_name="评论数")
    comment = models.CharField(max_length=500, null=True, verbose_name="评论")

    class Meta:
        db_table = 'article_detail'
        verbose_name = '文章详情'
        verbose_name_plural = verbose_name


# 相似文章


# 文章元数据表
class ArticleMetadata(BaseModel):
    """
    文章元数据表,存储文章相关信息;
    meta_id:文章唯一标识；
    meta_name:文章的不同属性；
    content:meta_id+meta_name获取content里的内容。
    ###
    {article_id} + tags = [文章的创建时间,]
    ###
    """
    meta_id = models.CharField(primary_key=True, max_length=100, null=False, verbose_name="文章元数据id")
    meta_name = models.CharField(max_length=100, null=False, verbose_name="文章元数据name")
    content = ArrayField(base_field=models.CharField(max_length=200), null=False, verbose_name="存储的内容列表")

    class Meta:
        db_table = 'article_metadata'
        verbose_name = '文章元数据'
        verbose_name_plural = verbose_name
