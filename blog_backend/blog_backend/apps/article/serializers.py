"""
文章序列化
"""

from rest_framework import serializers
from .models import ArticleDetail, ArticleList


class ArticleListSerializer(serializers.ModelSerializer):
    """文章列表序列化"""

    class Meta:
        model = ArticleList
        # exclude = ('updated_date', 'created_date')
        fields = '__all__'


class ArticleListQuerySerializer(serializers.Serializer):
    """文章列表查询条件"""
    page = serializers.CharField(required=False)


class ArticleDetailSerializer(serializers.ModelSerializer):
    """文章详情序列化"""

    class Meta:
        model = ArticleDetail
        # exclude = ('updated_date', 'created_date')
        fields = '__all__'


class ArticleDetailQuerySerializer(serializers.Serializer):
    """文章详情查询条件"""
    article_id = serializers.CharField(required=True)


class ArticleCategorySerializer(serializers.ModelSerializer):
    """文章分类序列化"""

    class Meta:
        model = ArticleList
        fields = '__all__'
