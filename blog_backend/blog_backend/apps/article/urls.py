"""
article 对应的url
"""


from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'article-list', views.ArticleListViewSets,
                basename='article_list')
router.register(r'article-detail', views.ArticleDetailViewSets,
                basename='article_detail')

urlpatterns = router.urls
