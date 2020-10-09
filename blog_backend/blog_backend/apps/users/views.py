"""
用户views
"""
import json

from django.contrib.auth import authenticate
from django import http
from django.views import View


class RegisterView(View):
    """用户注册"""

    def post(self, request):
        """用户注册"""
        username = request.body.get('username')
        password = request.body.get('password')
        mobile = request.body.get('mobile')
        verify_code = request.body.get('verify_code')
        return http.HttpResponseForbidden("注册成功")


"""
增加注册功能，可以邮箱、手机号、用户名登录。增加jwt-token认证，可以第三方登录(微信，qq，github，微博..) 后续增加文章详情页的排版和爬虫。
"""


class LoginView(View):
    """用户登录"""

    def post(self, request):
        """用户登录"""
        request_data_dict = json.loads(request.body)
        username = request_data_dict.get('username')
        pwd = request_data_dict.get('password')
        user = authenticate(request, username=username, password=pwd)
        return http.HttpResponse("登录成功")
        if user is None:
            return http.HttpResponseForbidden("用户名或密码错误")
