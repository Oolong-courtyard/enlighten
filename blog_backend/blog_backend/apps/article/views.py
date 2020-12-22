"""
文章对应的view
"""

from django.core.paginator import Paginator
from django_redis import get_redis_connection
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView

from django.conf import settings
from utils.base_response import BaseResponse, BusStatusCode
from .models import ArticleDetail, ArticleList
from .serializers import (
    ArticleDetailSerializer,
    ArticleListSerializer,
    ArticleCategorySerializer,
    ArticleDetailQuerySerializer,
    ArticleListQuerySerializer,
)

"""
django-redis基本使用:

cache = get_redis_connection('default')
msg = cache.get('msg')
"""


# 搜索
class ArticleSearch(GenericAPIView):
    """文章搜索"""

    def get(self, request):
        """文章搜索"""
        article_name = request.query_params.dict().get('articleName')
        target_page = request.query_params.dict().get('page')
        # TODO 以下需要修改，新增搜索的序列化器
        queryset = ArticleList.objects.filter(article_name__contains=article_name)
        num_of_per_page = settings.NUM_OF_PER_PAGE
        paginator = Paginator(queryset, num_of_per_page)
        page = paginator.page(target_page)
        serializer = ArticleListSerializer(page, many=True)
        # 返回响应: status 201,新建文章列表信息成功
        return BaseResponse(data=serializer.data)


# 分类
class ArticleCategory(ListAPIView):
    """文章分类"""
    queryset = ArticleList.objects.all()
    serializer_class = ArticleCategorySerializer
    filter_fields = ('category',)

    @swagger_auto_schema(
        operation_summary="获取分类文章"
    )
    def get(self, request, *args, **kwargs):
        """获取分类文章"""
        response = super().get(self, request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            return BaseResponse(data=response.data['results'])
        elif response.status_code == status.HTTP_404_NOT_FOUND:
            return BaseResponse(**BusStatusCode.BAD_REQUEST_4004)
        else:
            return BaseResponse(**BusStatusCode.INTERNAL_SERVER_ERROR_5002)


# 列表
class ArticleListView(APIView):
    """文章列表"""

    # queryset = ArticleList.objects.all()
    # serializer_class = ArticleListSerializer
    @swagger_auto_schema(
        operation_summary="获取文章列表",
        query_serializer=ArticleListQuerySerializer,
    )
    def get(self, request):
        """
        获取文章列表信息
        """
        target_page = request.query_params.dict().get('page')
        queryset = ArticleList.objects.all()
        num_of_per_page = NUM_OF_PER_PAGE
        paginator = Paginator(queryset, num_of_per_page)
        page = paginator.page(target_page)
        serializer = ArticleListSerializer(page, many=True)
        return BaseResponse(data=serializer.data)

    @swagger_auto_schema(
        operation_summary="新增文章列表",
        request_body=ArticleListSerializer,
    )
    def post(self, request):
        """
        新增/修改 文章列表信息
        """
        # client传递过来json数据
        # 反序列化-数据校验
        if isinstance(request.data, list):
            serializer = ArticleListSerializer(data=request.data, many=True)
        else:
            serializer = ArticleListSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # 反序列化-数据保存(create)
        serializer.save()
        # 返回响应: status 201,新建文章列表信息成功
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 详情
class ArticleDetailView(GenericAPIView):
    """文章详情"""
    queryset = ArticleList.objects.all()
    serializer_class = ArticleDetailSerializer
    pagination_class = None

    @swagger_auto_schema(
        operation_summary="获取文章详情",
        query_serializer=ArticleDetailQuerySerializer,
    )
    def get(self, request):
        """根据文章id,获取文章详情信息"""
        # print(request.query_params)
        queryset = ArticleDetail.objects.get(article_id=request.query_params.dict().get('article_id'))
        serializer = ArticleDetailSerializer(queryset)
        return BaseResponse(data=serializer.data)

    @swagger_auto_schema(
        operation_summary="新增文章详情"
    )
    def post(self, request):
        """新增文章详情信息"""
        # client传递过来json数据
        # 反序列化-数据校验
        serializer = ArticleDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # 反序列化-数据保存(create)
        serializer.save()
        # 返回响应: status 201,新建文章列表信息成功
        return Response(serializer.data, status=status.HTTP_201_CREATED)
