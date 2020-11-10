"""
QQ登录辅助工具类
"""

import json
from urllib.parse import urlencode, parse_qs
from urllib.request import urlopen
from itsdangerous import TimedJSONWebSignatureSerializer as TJWSSerializer
from itsdangerous import BadData

from django.conf import settings


class OAuthQQ(object):
    """QQ登录辅助文件"""
    # 对openid进行加解密的安全密钥
    SECRET_KEY = settings.SECRET_KEY
    # 对openid加密之后生成的access_token的有效时间
    EXPIRES_IN = 10 * 60

    def __init__(self, client_id=None, client_secret=None, redirect_url=None, state=None):
        # qq网站应用客户端id
        self.client_id = client_id or settings.QQ_CLIENT_ID
        # qq网站应用客户端密钥
        self.client_secret = client_secret or settings.QQ_CLIENT_SECRET
        # 网站回调的url地址
        self.redirect_url = redirect_url or settings.QQ_REDIRECT_URI
        self.state = state or settings.QQ_STATE

    def get_login_url(self):
        """获取QQ的登录网址"""
        params = {
            'response_type': 'code',
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'state': self.state,
            'scope': 'get_user_info',
        }
        # 用于获取 Authorization Code
        url = 'https://graph.qq.com/oauth2.0/authorize?' + urlencode(params)
        return url
