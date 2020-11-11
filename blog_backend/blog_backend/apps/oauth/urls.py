"""
第三方认证相关url
"""

from django.conf.urls import url

from oauth import views

urlpatterns = [
    url(r'authorization$', views.QQAuthURLView.as_view()),  # 获取qq登录的url地址
    url(r'^qq/user$', views.OAuthQQUserView.as_view()),  # qq登录并绑定用户信息到本应用

]
