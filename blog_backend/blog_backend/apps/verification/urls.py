"""
短信验证码
"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url('^sms/', views.SmsCodeView.as_view()),  # 用户
]