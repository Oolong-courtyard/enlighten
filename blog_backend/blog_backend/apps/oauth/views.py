from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView

from oauth.models import OAuthQQUser
from oauth.utils import OAuthQQ
from users.models import UserProfile


class QQAuthURLView(APIView):
    """QQ登录的url地址"""

    def get(self, request):
        """获取qq登录的地址"""
        next = request.query_params.get('next', '/')
        oauth = OAuthQQ(state=next)
        # 前端请求该地址,获取授权
        login_url = oauth.get_login_url()
        return Response({'login_url': login_url})


class OAuthQQUserView(APIView):
    """
    1.根据authorization code获取 access_token
    2.根据 access_token 获取QQ授权登录用户的openid
    3.根据`openid`查询表(oauth_qq)；
    3.1 已经绑定,生成token返回；
    3.2 未绑定过,自动绑定并注册后生成token返回。
    """

    def get(self, request):
        # 1.根据authorization code获取 access_token
        authorization_code = request.query_params.get('code')
        oauth = OAuthQQ()
        access_token = oauth.get_access_token(authorization_code)
        open_id = oauth.get_openid(access_token)
        # 根据openid去表(oauth_qq)查询是否存在该用户
        try:
            oauth_user = OAuthQQUser.objects.get(openid=open_id)
        except OAuthQQUser.DoesNotExist:
            # 该用户不存在,直接将该用户成功注册为本应用的用户
            # 首先从QQ获取用户信息
            user_info = oauth.get_user_info(access_token, open_id)
            # 将用户信息存入数据库并生成token返回
            print(user_info)
            """
            1.此时信息保存到UserProfile中(第三方登录没有手机号和邮箱,而该应用只能使用手机号或邮箱才能登陆),
            因此，第三方登陆成功后，虽然系统将其保存为该应用的用户，但是却无法通过账密的方式登陆，除非绑定手机号
            或者邮箱；在绑定手机号或邮箱的时候验证手机号或邮箱是否已经被注册过即可兼容第三方登陆和账密注册登陆的冲突。
            """
            OAuthQQUser.objects.create()
            UserProfile.objects.create_user(**user_info)
            # TODO 将用户信息保存到 UserProfile

            # 拿到qq授权用户的信息之后，保存到 UserProfile中，此时该用户无手机号和邮箱，因此无法通过账密方式登陆。除非在个人主页绑定手机号或邮箱。
            # 在绑定手机号或邮箱的时候就可以验证手机号或邮箱是否已经被注册过。
            # 如果通过三方的方式登陆并且未绑定手机号或邮箱，那么该用户下次依然只能通过三方的方式登陆本应用。

            # TODO 将qq授权用户的openid存入OAuthQQUser


        else:
            # 用户已经绑定过,生成 JWT token信息
            user = oauth_user.user
            from rest_framework_jwt.settings import api_settings
            # 生成token
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            # 生成载荷信息(payload)
            payload = jwt_payload_handler(user)
            # 生成jwt token
            token = jwt_encode_handler(payload)
            response = Response({
                'token': token,
                'user_id': user.id,
                'username': user.username,
                # 可以返回更多的用户信息
            })
            return response