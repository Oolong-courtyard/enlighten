"""
用户views
"""
import json
import re

from django.contrib.auth import authenticate
from django import http
from django.views import View
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, exceptions
from rest_framework.views import APIView

from users.models import UserProfile, UserStar
from users.serializers import (
    LoginViewSerializer,
    UserStarCountQuerySerializer,
    UserRegisterSerializer,
    UsernameCountViewQuerySerializer,
    PhoneCountViewQuerySerializer,
)
from utils.base_response import BaseResponse, BusStatusCode
from utils.user_auth import UserAuth


# 获取用户点赞的文章
class UserStarCountView(APIView):
    """获取用户点赞的文章"""

    authentication_classes = [UserAuth]

    @swagger_auto_schema(
        operation_summary="获取用户点赞的文章",
        query_serializer=UserStarCountQuerySerializer,
    )
    def get(self, request):
        """获取用户点赞的文章"""
        user_id = request.query_params.dict().get("user_id")
        res = UserStar.objects.get(user_id=user_id)
        return BaseResponse(data=res.article_id)


# 用户数量
class UsernameCountView(APIView):
    """用户数量"""

    @swagger_auto_schema(
        operation_summary="获取用户数量",
        query_serializer=UsernameCountViewQuerySerializer
    )
    def get(self, request):
        """获取用户数量"""
        # 这里判断用户数量只是为了给前台用户提示
        count = UserProfile.objects.filter(
            username=request.GET.get('username')).count()
        if count > 0:
            return http.HttpResponseBadRequest('用户已经存在')
        else:
            return http.HttpResponse('用户名不存在,可以注册')


# 手机号数量
class PhoneCountView(APIView):
    """手机号数量"""

    @swagger_auto_schema(
        operation_summary="获取手机号数量",
        query_serializer=PhoneCountViewQuerySerializer
    )
    def get(self, request):
        """获取手机号数量"""
        # 这里判断手机号数量只是为了给前台用户提示
        phone = request.GET.get('phone')
        if not re.match("^1[3-9]\d{9}$", phone):
            raise exceptions.ValidationError(**BusStatusCode.BAD_REQUEST_4002)
        count = UserProfile.objects.filter(mobile=phone).count()
        if count > 0:
            return BaseResponse(status=status.HTTP_400_BAD_REQUEST, **BusStatusCode.BAD_REQUEST_4012)
        else:
            return BaseResponse(detail="手机号可以注册")


# 用户注册
class RegisterView(APIView):
    """
    用户注册
    传入参数：username, password, ensurePassword
    """

    @swagger_auto_schema(
        operation_summary="用户注册",
        request_body=UserRegisterSerializer
    )
    def post(self, request):
        """用户注册"""
        # 1.获取参数并校验
        # 2.保存注册用户信息
        # 3.返回应答,注册成功
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            jwt_response = serializer.save()
            return BaseResponse(detail="注册成功", data=jwt_response)
        else:
            return BaseResponse(detail="注册失败", status=status.HTTP_400_BAD_REQUEST)


"""
增加注册功能，可以手机号、用户名登录。增加jwt-token认证，可以第三方登录(微信，qq，github)。
"""


# 用户登录
class LoginView(APIView):
    """用户登录"""

    @swagger_auto_schema(
        operation_summary="用户登录",
        request_body=LoginViewSerializer,
    )
    def post(self, request):
        """用户登录"""
        request_data_dict = json.loads(request.body)
        username = request_data_dict.get('username')
        pwd = request_data_dict.get('password')
        user = authenticate(request, username=username, password=pwd)
        if user is None:
            return http.HttpResponse(status=400, content="用户名或密码错误")
        # 用户认证成功,生成jwt Token,
        response = UserProfile.generate_jwt_token(user)
        # 将token存入redis中
        UserProfile.token_to_cache(user.id, response['token'])
        # 登录成功返回用户头像
        response['profile_photo'] = user.profile_photo
        return BaseResponse(data=response)


# 邮箱激活
class EmailActiveView(View):
    """邮箱激活"""
    pass
