"""business 对应的urls"""

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'star', views.StarView.as_view()), #用户点赞
    url(r'article-publish/', views.ArticlePublishView.as_view()), #用户点赞

    url(r'recommend', views.ArticleRecommendView.as_view()),  # 这里只是访问推荐系统暴露的api获取数据
]
