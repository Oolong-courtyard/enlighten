"""
用户认证类
"""
from django.core.cache import cache
from django.conf import settings
from rest_framework import status
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from utils.base_response import BaseResponse, BusStatusCode


class UserAuth(BaseAuthentication):
    """用户认证类"""

    def authenticate(self, request):
        """token校验"""
        token = request.META.get('HTTP_X_TOKEN')
        user_id = request.query_params.dict().get('user_id') if request.query_params.dict().get('user_id') else request.data.get('user_id')
        token_key = settings.TOKEN_KEY_PREFIX + user_id
        # 从redis中获取token

        cache_token = cache.get(token_key)
        # 与客户端传过来的token做对比
        try:
            if token != cache_token:
                raise AuthenticationFailed("token认证失败")
        except AuthenticationFailed:
            raise AuthenticationFailed
            # raise AuthenticationFailed("token认证失败")
