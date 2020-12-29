"""
短信验证码
"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url('^sms/(?P<phone>1[3-9]\d{9})/$', views.SmsCodeView.as_view()),  # 用户
]