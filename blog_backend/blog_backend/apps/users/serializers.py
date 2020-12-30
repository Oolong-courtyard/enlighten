"""
注册按钮点击接口使用的序列化器
"""
import re

from django.core.cache import cache
from rest_framework import serializers, status
from rest_framework import exceptions
from django.conf import settings

from users.models import UserProfile, UserStar

# 用户点赞文章查询序列化器
from utils.base_response import BaseResponse, BusStatusCode


class UserStarCountQuerySerializer(serializers.Serializer):
    """用户点赞文章"""
    user_id = serializers.CharField(label="用户id", required=True)


# 用户登录序列化器
class LoginViewSerializer(serializers.ModelSerializer):
    """用户登录序列化器"""

    # username = serializers.CharField(validators=[UnicodeUsernameValidator()], label="用户名", write_only=True)
    # password = serializers.CharField(label="密码", write_only=True)

    class Meta:
        model = UserProfile
        fields = ('username', 'password')


# 创建用户序列化器
class UserRegisterSerializer(serializers.ModelSerializer):
    """
    创建用户序列化器
    """
    # 该字段只在反序列化的时候使用,序列化的时候用不到

    sms_code = serializers.CharField(label="短信验证码", write_only=True)
    ensure_password = serializers.CharField(label="确认密码", write_only=True)
    phone = serializers.CharField(label="手机号", write_only=True)
    username = serializers.CharField(label="用户名", required=True)

    class Meta:
        # 指定序列化的对象
        model = UserProfile
        fields = ('username', 'sms_code', 'password', 'phone', 'ensure_password')
        # 配置额外参数的校验规则
        extra_kwargs = {
            'username': {
                'min_length': 5,
                'max_length': 10,
                'error_messages': {
                    'min_length': '仅允许5-10个字符的用户名',
                    'max_length': '仅允许5-10个字符的用户名',
                }
            },
            'password': {
                # 反序列化时使用,序列化时用不到
                'write_only': True,
                'min_length': 5,
                'max_length': 10,
                'error_messages': {
                    'min_length': '仅允许5-10个字符的密码',
                    'max_length': '仅允许5-10个字符的密码',
                }
            },
        }

    # 添加验证方法
    def validate_username(self, value):
        """验证用户名"""
        count = UserProfile.objects.filter(username=value).count()
        if count > 0:
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4013)
        return value

    def validate_phone(self, value):
        """验证手机号"""
        # 验证手机号格式
        if not re.match(r'^1[3-9]\d{9}$', value):
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4002)
        # 验证手机号是否已经存在
        count = UserProfile.objects.filter(mobile=value).count()
        if count > 0:
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4012)
        return value

    def validate(self, attrs):
        """
        判断手机验证码是否正确；
        判断两次密码是否一致；
        """
        if attrs['sms_code'] != cache.get(settings.SMS_PREFIX + attrs['phone']):
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4011)
        if attrs['password'] != attrs['ensure_password']:
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4001)
        return attrs

    def create(self, validated_data):
        """
        创建用户
        """
        # 移除数据库模型类中不存在的属性
        validated_data['mobile'] = validated_data['phone']
        del validated_data['sms_code']
        del validated_data['ensure_password']
        del validated_data['phone']
        # 创建用户
        user = UserProfile.objects.create_user(**validated_data)
        # 用户认证成功,生成jwt Token,
        response = UserProfile.generate_jwt_token(user)
        # 将token存入redis中
        UserProfile.token_to_cache(user.id, response['token'])
        return response


# 用户注册手机验证码
class SmsCodeViewSerializer(serializers.ModelSerializer):
    """用户注册手机验证码"""
    pass
