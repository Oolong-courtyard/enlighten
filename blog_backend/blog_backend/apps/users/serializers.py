"""
注册按钮点击接口使用的序列化器
"""
import re

from django.contrib.auth.validators import UnicodeUsernameValidator
from rest_framework import serializers

from users.models import UserProfile, UserStar


class UserStarQuerySerializer(serializers.ModelSerializer):
    """用户文章点赞查询参数"""
    action = serializers.ChoiceField(choices=[0, 1], write_only=True, label="点赞行为")
    article_id = serializers.CharField(label="文章id", required=True)

    class Meta:
        model = UserStar
        fields = ('user_id', 'article_id', 'action')
        # extra_kwargs = {
        #     'action':{
        #         'min_length': 1,
        #         'max_length': 1,
        #         'error_messages': {
        #             'min_length': '只能输入0或1',
        #             'max_length': '只能输入0或1',
        #         }
        #     }
        # }


class LoginViewSerializer(serializers.ModelSerializer):
    """用户登录序列化器"""

    # username = serializers.CharField(validators=[UnicodeUsernameValidator()], label="用户名", write_only=True)
    # password = serializers.CharField(label="密码", write_only=True)

    class Meta:
        model = UserProfile
        fields = ('username', 'password')


class CreateUserSerializer(serializers.ModelSerializer):
    """
    创建用户序列化器
    """
    # 该字段只在反序列化的时候使用,序列化的时候用不到
    ensurePassword = serializers.CharField(label="确认密码", write_only=True)

    class Meta:
        # 指定序列化的对象
        model = UserProfile
        fields = ('username', 'birthday', 'gender',
                  'mobile', 'password', 'ensurePassword')
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
            raise serializers.ValidationError("用户名已存在")
        return value

    # def validate_mobile(self, value):
    #     """验证手机号"""
    #     # 验证手机号格式
    #     if not re.match(r'^1[3-9]\d{9}$', value):
    #         raise serializers.ValidationError("手机号格式错误")
    #
    #     # 验证手机号是否已经存在
    #     count = UserProfile.objects.filter(mobile=value).count()
    #     if count > 0:
    #         raise serializers.ValidationError("手机号已存在")

    def validate(self, attrs):
        """判断两次密码是否一致"""
        if attrs['password'] != attrs['ensurePassword']:
            raise serializers.ValidationError("两次密码不一致")
        return attrs

    def create(self, validated_data):
        """
        创建用户
        """
        # 移除数据库模型类中不存在的属性
        del validated_data['ensurePassword']
        # 创建用户
        user = UserProfile.objects.create_user(**validated_data)
        return user
