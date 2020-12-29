"""
短信验证码序列化器
"""
from rest_framework import serializers


class SmsCodeViewQuerySerializer(serializers.ModelSerializer):
    """短信验证码查询序列化器"""
    phone = serializers.CharField(max_length=11, min_length=11, label="手机号")
