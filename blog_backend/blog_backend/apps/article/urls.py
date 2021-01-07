"""
article 对应的url
"""

from rest_framework.routers import DefaultRouter

from . import views

from django.conf.urls import url


urlpatterns = [
    url(r'article-list/', views.ArticleListView.as_view()),  # 文章列表
    url(r'article-detail/', views.ArticleDetailView.as_view()),  # 文章详情
    # url(r'article-details/', views.ArticleDetailsView.as_view()),  # 文章详情
    url(r'^search/', views.ArticleSearch.as_view()),  # 搜索
    url(r'^category/', views.ArticleCategory.as_view()),  # 分类
]

router = DefaultRouter()

urlpatterns += router.urls
