"""
用户views
"""
import json

from django.contrib.auth import authenticate
from django import http
from django.views import View
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from users.models import UserProfile, UserStar
from users.serializers import CreateUserSerializer, LoginViewSerializer, UserStarQuerySerializer
from utils.base_response import BaseResponse
from utils.user_auth import UserAuth


class UserStarView(APIView):
    """用户点赞"""
    x_token = openapi.Parameter('x-token', openapi.IN_HEADER, description='认证token', type=openapi.TYPE_STRING, required=True)
    # 自定义认证类
    authentication_classes = [UserAuth]

    @swagger_auto_schema(
        operation_summary="文章点赞",
        query_serializer=UserStarQuerySerializer,
        manual_parameters=[x_token],
    )
    def get(self, request):
        """根据传递过来的action 点赞/取消点赞"""
        request_dict = request.query_params.dict()
        user_id = request_dict.get("user_id")
        article_id = request_dict.get("article_id")
        if request_dict.get("action") == "1":
            # 点赞
            try:
                res = UserStar.objects.get(user_id=user_id)
                if article_id not in res.article_id:
                    # 将该文章id添加进去
                    res.article_id.append(article_id)
                    UserStar.objects.update(user_id=user_id, article_id=res.article_id)
                # 如果传递过来的文章id在res中，不做操作
            except UserStar.DoesNotExist:
                # 用户从未点过赞,将该文章id加入，然后存进db;
                UserStar.objects.create(user_id=user_id, article_id=[article_id])
        elif request_dict.get("action") == "0":
            # 取消点赞
            try:
                res = UserStar.objects.get(user_id=user_id)
            except UserStar.DoesNotExist:
                # 无需任何操作
                pass
            # 如果传递过来的文章id在res中，删除它；否则不做操作
            if article_id in res.article_id:
                res.remove(article_id)
                UserStar.objects.update(user_id=user_id, article_id=res.article_id)
        else:
            return BaseResponse(data="操作失败,action只能为`1`或者`2`")
        return BaseResponse(data="点赞/取消点赞成功")


class UsernameCountView(View):
    """用户数量"""

    def get(self, request):
        """获取用户数量"""
        # 这里判断用户数量只是为了给前台用户提示
        count = UserProfile.objects.filter(
            username=request.GET.get('username')).count()
        if count > 0:
            return http.HttpResponseBadRequest('用户已经存在')
        else:
            return http.HttpResponse('用户名不存在,可以注册')


class RegisterView(CreateAPIView):
    """
    用户注册
    传入参数：username, password, ensurePassword
    """
    # 1.获取参数并校验
    # 2.保存注册用户信息
    # 3.返回应答,注册成功
    serializer_class = CreateUserSerializer
    # TODO 注册成功后需要返回token


"""
增加注册功能，可以邮箱、手机号、用户名登录。增加jwt-token认证，可以第三方登录(微信，qq，github，微博..) 后续增加文章详情页的排版和爬虫。
"""


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
        return BaseResponse(data=response)


class EmailActiveView(View):
    """邮箱激活"""
    pass
