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


class ArticleDetailSerializer(serializers.ModelSerializer):
    """文章详情序列化"""

    class Meta:
        model = ArticleDetail
        # exclude = ('updated_date', 'created_date')
        fields = '__all__'


# =======================================================
# crawler专用
# =======================================================
from rest_framework import serializers


class JueJinArticleListSerializer(serializers.ModelSerializer):
    """掘金文章列表序列化器"""

    class Meta:
        model = ArticleList
        fields = '__all__'

class JueJinArticleDetailSerializer(serializers.Serializer):
    """掘金文章详情序列化器"""
    pass
