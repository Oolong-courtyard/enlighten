"""
用户模型类
"""
from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class UserProfile(AbstractUser):
    """用户模型类"""
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(max_length=6,
                              choices=(("male", u"男"), ("female", "女")),
                              default="female",
                              verbose_name="性别")
    mobile = models.CharField(null=True,
                              blank=True,
                              max_length=11,
                              verbose_name="电话")

    class Meta:
        db_table = "user_profile"
        verbose_name = "用户"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class VerifyCode(models.Model):
    """短信验证码"""
    code = models.CharField(max_length=10, verbose_name="验证码")
    mobile = models.CharField(max_length=11, verbose_name="电话")
    add_time = models.DateTimeField(auto_now=True,
                                    verbose_name="添加时间")

    class Meta:
        db_table = "verify_code"
        verbose_name = "短信验证码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.code
