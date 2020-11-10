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
            'redirect_uri': self.redirect_url,
            'state': self.state,
            'scope': 'get_user_info',
        }
        # 用于获取 Authorization Code
        url = 'https://graph.qq.com/oauth2.0/authorize?' + urlencode(params)
        try:
            # 访问url所对应的qq服务器
            # 获取用户对应的access_token
            response = urlopen(url)
        except Exception as e:
            raise str("QQApi错误".format(e))
        # 获取相应数据并解码
        res_data = response.read().decode()
        res_dict = parse_qs(res_data)
        access_token = res_dict.get('access_token')
        if not access_token:
            raise ValueError("获取access_token失败")
        return access_token[0]

    def get_openid(self, access_token):
        """
        获取openid
        openid(QQ授权用户的openid)代表:目标网站或应用中某个用户的唯一标识
        """
        url = 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token
        try:
            response = urlopen(url)
        except Exception as e:
            raise ValueError(e)
        res_data = response.read().decode()
        try:
            res_dict = json.loads(res_data[10:-4])
        except Exception as e:
            res_dict = parse_qs(res_data)
            raise ValueError(e)
        # 获取openid
        openid = res_dict.get('openid')
        return openid

    # 类方法使用场景，当一个方法中只涉及到静态属性的时候可以使用类方法
    @classmethod
    def generate_save_user_token(cls, openid, secret_key=None, expires=None):
        """
        对openid进行加密:
        """
        if secret_key is None:
            secret_key = cls.SECRET_KEY
        if expires is None:
            expires = cls.EXPIRES_IN
        serializer = TJWSSerializer(secret_key, expires)
        token = serializer.dumps({'openid': openid})
        return token.decode()
