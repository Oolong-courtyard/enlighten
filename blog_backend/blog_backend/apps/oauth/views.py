from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from oauth.utils import OAuthQQ


class QQAuthURLView(APIView):
    """QQ登录的url地址"""

    def get(self, request):
        """获取qq登录的地址"""
        next = request.query_params.get('next', '/')
        oauth = OAuthQQ(state=next)
        # 前端请求该地址,获取授权
        login_url = oauth.get_login_url()
        return Response({'login_url': login_url})
