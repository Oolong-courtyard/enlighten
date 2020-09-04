"""
文章对应的view
"""

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import ArticleDetail, ArticleList
from .serializers import ArticleDetailSerializer, ArticleListSerializer


class ArticleListViewSets(ModelViewSet):
    """文章列表"""

    queryset = ArticleList.objects.all()
    serializer_class = ArticleListSerializer


class ArticleDetailViewSets(ModelViewSet):
    """文章详情"""

    queryset = ArticleDetail.objects.all()
    serializer_class = ArticleDetailSerializer
