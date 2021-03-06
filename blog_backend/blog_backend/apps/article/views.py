"""
文章对应的view
"""

from django.core.cache import cache
from django.core.paginator import Paginator, EmptyPage
from django_redis import get_redis_connection
from drf_yasg import openapi
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
from utils.user_auth import UserAuth
from .models import ArticleDetail, ArticleList
from .serializers import (
    ArticleDetailSerializer,
    ArticleListSerializer,
    ArticleCategorySerializer,
    ArticleDetailQuerySerializer,
    ArticleListQuerySerializer,
    ArticleSearchQuerySerializer,
)

"""
django-redis基本使用:

cache = get_redis_connection('default')
msg = cache.get('msg')
"""


# 搜索
class ArticleSearch(GenericAPIView):
    """文章搜索"""
    serializer_class = ArticleListSerializer

    @swagger_auto_schema(
        operation_summary="文章搜索",
        query_serializer=ArticleSearchQuerySerializer,
    )
    def get(self, request):
        """文章搜索"""
        article_name = request.query_params.dict().get('articleName')
        target_page = request.query_params.dict().get('page', 1)
        # TODO 以下需要修改，新增搜索的序列化器
        queryset = ArticleList.objects.filter(article_name__contains=article_name)
        num_of_per_page = settings.NUM_OF_PER_PAGE
        paginator = Paginator(queryset, num_of_per_page)
        try:
            page = paginator.page(target_page)
        except EmptyPage:
            return BaseResponse(status=status.HTTP_400_BAD_REQUEST, **BusStatusCode.BAD_REQUEST_4014)
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
        # TODO 这里通过origin来区分获取的是爬取的文章列表还是用户发布的文章列表
        target_page = request.query_params.dict().get('page', 1)
        origin = request.query_params.dict().get('origin')
        num_of_per_page = settings.NUM_OF_PER_PAGE
        # 首页列表访问压力最大，做缓存优化
        # cache_key = settings.CACHE_KEY_PREFIX + "::" + str(target_page) + ":" + str(num_of_per_page)
        # cache_res = cache.get(cache_key)
        # if cache_res:
        #     # todo 2021/03/26
        #     # todo 增加了缓存，手动模拟测试单个响应时间是原来的 1/5，但是随着请求数的增加，响应效果并不是线性减少的；
        #     # todo 我在使用locust测试的时候甚至发现加了redis之后，RPS 反而上不去。
        #     print("走了缓存")
        #     return BaseResponse(data=cache_res)
        # print("查询了数据库")
        if origin:
            queryset = ArticleList.objects.filter(origin=origin).order_by('-publish_time')
        else:
            queryset = ArticleList.objects.all()
        paginator = Paginator(queryset, num_of_per_page)
        page = paginator.page(target_page)
        serializer = ArticleListSerializer(page, many=True)
        # 将该查询条件下的结果存入缓存中
        # cache.set(cache_key, serializer.data, settings.CACHE_RES_EXPIRE)
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


class ArticleDetailsView(GenericAPIView):
    queryset = ArticleList.objects.all()
    serializer_class = ArticleDetailSerializer
    pagination_class = None

    @swagger_auto_schema(
        operation_summary="获取文章详情aaaaa",
        query_serializer=ArticleDetailQuerySerializer,
    )
    def get(self, request):
        """根据文章id,获取文章详情信息"""
        # print(request.query_params)
        queryset = ArticleList.objects.get(article_id=request.query_params.dict().get('article_id'))
        serializer = ArticleListSerializer(queryset)
        return BaseResponse(data=serializer.data)


# 详情
class ArticleDetailView(GenericAPIView):
    """文章详情"""
    # x_token = openapi.Parameter('x-token', openapi.IN_HEADER, description='认证token', type=openapi.TYPE_STRING, required=True)
    # authentication_classes = [UserAuth]

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
