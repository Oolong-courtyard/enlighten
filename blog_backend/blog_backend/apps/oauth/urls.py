"""
第三方认证相关url
"""

from django.conf.urls import url

from oauth.views import QQAuthURLView

urlpatterns = [
    url(r'authorization$', QQAuthURLView.as_view()),

]
