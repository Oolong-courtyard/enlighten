"""
article 对应的url
"""

from rest_framework.routers import DefaultRouter

from . import views

from django.conf.urls import url

# ===============================================
# crawler专用
# ===============================================
urlpatterns = [
    url(r'juejin-article-list', views.JueJinArticleList.as_view()),
    url(r'juejin-article-detail', views.JueJinArticleDetail.as_view()),
]

router = DefaultRouter()

router.register(r'article-list', views.ArticleListViewSets,
                basename='article_list')
router.register(r'article-detail', views.ArticleDetailViewSets,
                basename='article_detail')

urlpatterns += router.urls
