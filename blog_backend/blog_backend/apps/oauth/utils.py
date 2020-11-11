"""
QQ登录辅助工具类

`its dangerous` 模块的使用场景:
当你需要将数据发送到一些不信任的环境,如何保证安全取回且数据不被修改呢？
使用its dangerous,你只需要一个密钥对数据加密签名之后，将数据转交给他人。
当你取回数据时候，就可以轻松确保该数据是否被篡改过。

"""

import json
import random

from urllib.parse import urlencode
from itsdangerous import TimedJSONWebSignatureSerializer as TJWSSerializer
import requests

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
        return url

    def get_access_token(self, code):
        """
        根据code获取access_token
        """
        # 组织请求参数
        params = {
            'grant_type': 'authorization_code',
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'code': code,
            'redirect_uri': self.redirect_url,
            'fmt': 'json',
        }
        url = 'https://graph.qq.com/oauth2.0/token?' + urlencode(params)
        try:
            # 发送请求获取access_token
            res = requests.get(url, verify=False)
            data = json.loads(res.text)
        except Exception as e:
            raise e
            # raise Exception("qq请求失败")
        # 提取access_token
        access_token = data.get('access_token')
        if not access_token:
            raise Exception('access_token获取失败')
        return access_token

    def get_openid(self, access_token):
        """
        获取openid
        openid(QQ授权用户的openid)代表:目标网站或应用中某个用户的唯一标识
        """
        url = 'https://graph.qq.com/oauth2.0/me?access_token={}&fmt={}'.format(access_token, 'json')
        try:
            res = requests.get(url, verify=False)
            data = json.loads(res.text)
        except Exception:
            raise Exception("qq请求失败")
        # 提取openid
        openid = data.get('openid')
        if not openid:
            raise Exception('openid获取失败')
        return openid

    def get_user_info(self, access_token, openid):
        """获取qq用户信息"""
        url = 'https://graph.qq.com/user/get_user_info?access_token={}&oauth_consumer_key={}&openid={}'.format(
            access_token,
            self.client_id,
            openid
        )
        try:
            res = requests.get(url, verify=False)
            data = json.loads(res.text)
        except Exception:
            raise Exception("qq获取用户信息失败")
        # 提取用户信息
        user_info = dict()
        user_info['username'] = data.get('nickname') + '_' + str(random.randint(100, 999))
        user_info['gender'] = data.get('gender')
        user_info['come_from'] = data.get('city')
        user_info['birthday'] = data.get('year')
        profile_photo = data.get('figureurl_qq_2')
        if not profile_photo:
            profile_photo = data.get('figureurl_qq_1')
        user_info['profile_photo'] = profile_photo
        return user_info

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
