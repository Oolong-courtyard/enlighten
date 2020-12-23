"""business 对应的urls"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'star', views.StarView.as_view()),
]
