"""
用户模型类
"""
from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.core.cache import cache
from django.db import models
from django.conf import settings
from django.utils import timezone
from rest_framework.response import Response

from utils.models import BaseModel


# 用户模型
class UserProfile(AbstractUser):
    """用户模型类"""
    birthday = models.CharField(max_length=8, null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(max_length=6, choices=(("male", u"男"), ("female", "女")), default="female", verbose_name="性别")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话")
    come_from = models.CharField(null=True, blank=True, max_length=50, verbose_name="籍贯")
    profile_photo = models.TextField(max_length=500, null=True, verbose_name="用户头像链接")

    class Meta:
        db_table = "user_profile"
        verbose_name = "用户"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username

    @staticmethod
    def generate_jwt_token(user):
        """生成 jwt token"""
        from rest_framework_jwt.settings import api_settings
        # 生成token
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        # 生成载荷信息(payload)
        payload = jwt_payload_handler(user)
        # 生成jwt token
        token = jwt_encode_handler(payload)
        response = {
            'token': token,
            'user_id': user.id,
            'username': user.username,
            # 可以返回更多的用户信息(比如用户的头像)
        }
        return response

    @staticmethod
    def token_to_cache(user_id, token):
        """将生成的token 存入redis中"""
        # 将token设置到缓存中,默认过期时间为1小时
        # TODO 后续优化,可以加入 one_time_token和 续约用户token的有效时长
        # 构建key
        token_key = settings.TOKEN_KEY_PREFIX + str(user_id)
        # 将token存入redis中
        cache.set(token_key, token, settings.TOKEN_EXPIRE)


# 用户点赞
class UserStar(BaseModel):
    """
    用户点赞；
    user_id唯一，一个user_id对应一个article_id列表，列表中存放点赞的文章id
    注意：某个用户点赞的article_id列表中不能 有重复元素，insert的时候先去重。
    """
    user_id = models.CharField(max_length=100, verbose_name="用户id", unique=True)
    article_id = ArrayField(base_field=models.CharField(max_length=100, verbose_name="文章id"), null=True, verbose_name="文章id列表")

    class Meta:
        db_table = "user_star"
        verbose_name = "用户点赞数"
        verbose_name_plural = verbose_name


# 相似用户


# 短信验证码
class VerifyCode(models.Model):
    """短信验证码"""
    code = models.CharField(max_length=10, verbose_name="验证码")
    mobile = models.CharField(max_length=11, verbose_name="电话")
    add_time = models.DateTimeField(auto_now=True, verbose_name="添加时间")

    class Meta:
        db_table = "verify_code"
        verbose_name = "短信验证码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.code
