"""
users 对应的url
"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url('^usernames-count', views.UsernameCountView.as_view()),
    url('^register$', views.RegisterView.as_view()),  # 用户注册
    url('^login$', views.LoginView.as_view()),
    url('^emails/verification$', views.EmailActiveView.as_view()),
]
