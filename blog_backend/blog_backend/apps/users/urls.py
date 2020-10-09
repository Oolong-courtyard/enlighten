"""
users 对应的url
"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url('^register$', views.RegisterView.as_view()),
    url('^login$', views.LoginView.as_view()),
]
