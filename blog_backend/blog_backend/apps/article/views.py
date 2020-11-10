"""
文章对应的view
"""

from django_redis import get_redis_connection
from rest_framework.filters import SearchFilter

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView

from .models import ArticleDetail, ArticleList
from .serializers import (
    ArticleDetailSerializer,
    ArticleListSerializer,
    JueJinArticleListSerializer,
    JueJinArticleDetailSerializer,
    ArticleCategorySerializer,
)

"""
django-redis基本使用:

cache = get_redis_connection('default')
msg = cache.get('msg')
"""


class ArticleListViewSets(ModelViewSet):
    """文章列表"""

    queryset = ArticleList.objects.all()
    serializer_class = ArticleListSerializer


class ArticleDetailViewSets(ModelViewSet):
    """文章详情"""

    queryset = ArticleDetail.objects.all()
    serializer_class = ArticleDetailSerializer


class ArticleSearch(GenericAPIView):
    """文章搜索"""

    def get(self, request):
        """文章搜索"""
        request_data = request.query_params
        # TODO 以下需要修改，新增搜索的序列化器
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        # 反序列化-数据保存(create)
        serializer.save()
        # 返回响应: status 201,新建文章列表信息成功
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ArticleCategory(ListAPIView):
    """文章分类"""
    queryset = ArticleList.objects.all()
    serializer_class = ArticleCategorySerializer
    filter_fields = ('category', 'author')


# =======================================================
# crawler专用
# =======================================================
from rest_framework import status
from rest_framework.generics import GenericAPIView


# 掘金文章列表
class JueJinArticleList(GenericAPIView):
    """掘金文章列表"""
    # 指定当前视图使用的查询集
    queryset = ArticleList.objects.all()
    # 指定当前视图使用的序列化器
    serializer_class = JueJinArticleListSerializer

    def post(self, request):
        """新增文章列表信息"""
        # client传递过来json数据
        # 反序列化-数据校验
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        # 反序列化-数据保存(create)
        serializer.save()
        # 返回响应: status 201,新建文章列表信息成功
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 掘金文章详情
class JueJinArticleDetail(GenericAPIView):
    """掘金文章详情"""
    pass
