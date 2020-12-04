"""
文章对应的view
"""

from django_redis import get_redis_connection
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView

from .models import ArticleDetail, ArticleList
from .serializers import (
    ArticleDetailSerializer,
    ArticleListSerializer,
    ArticleCategorySerializer,
)

"""
django-redis基本使用:

cache = get_redis_connection('default')
msg = cache.get('msg')
"""


# 搜索
# class ArticleSearch(GenericAPIView):
#     """文章搜索"""
#
#     def get(self, request):
#         """文章搜索"""
#         request_data = request.query_params
#         # TODO 以下需要修改，新增搜索的序列化器
#         serializer = self.get_serializer(data=request.data, many=True)
#         serializer.is_valid(raise_exception=True)
#         # 反序列化-数据保存(create)
#         serializer.save()
#         # 返回响应: status 201,新建文章列表信息成功
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# 分类
# class ArticleCategory(ListAPIView):
#     """文章分类"""
#     queryset = ArticleList.objects.all()
#     serializer_class = ArticleCategorySerializer
#     filter_fields = ('category', 'author')


# 列表
class ArticleListView(ListAPIView, CreateAPIView):
    """文章列表"""

    queryset = ArticleList.objects.all()
    serializer_class = ArticleListSerializer

    # def get(self, request):
    #     """
    #     获取文章列表信息
    #     """
    #     queryset = ArticleList.objects.all()
    #     serializer = ArticleListSerializer(queryset, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    #
    # def post(self, request):
    #     """
    #     新增/修改 文章列表信息
    #     """
    #     # client传递过来json数据
    #     # 反序列化-数据校验
    #     serializer = ArticleListSerializer(data=request.data, many=True)
    #     serializer.is_valid(raise_exception=True)
    #     # 反序列化-数据保存(create)
    #     serializer.save()
    #     # 返回响应: status 201,新建文章列表信息成功
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)


# 详情
class ArticleDetailView(GenericAPIView):
    """文章详情"""
    queryset = ArticleList.objects.all()
    serializer_class = ArticleDetailSerializer

    def post(self, request):
        """新增文章详情信息"""
        # client传递过来json数据
        # 反序列化-数据校验
        serializer = ArticleDetailSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        # 反序列化-数据保存(create)
        serializer.save()
        # 返回响应: status 201,新建文章列表信息成功
        return Response(serializer.data, status=status.HTTP_201_CREATED)
