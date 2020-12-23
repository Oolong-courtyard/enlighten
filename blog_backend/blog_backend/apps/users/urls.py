"""
users 对应的url
"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url('^username-count', views.UsernameCountView.as_view()),
    url('^register$', views.RegisterView.as_view()),  # 用户注册
    url('^login$', views.LoginView.as_view()),
    url('^emails/verification$', views.EmailActiveView.as_view()),
    url('^user-star-count', views.UserStarCountView.as_view()),

]
