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

    def create(self, validated_data):
        """重写父类created方法"""
        article_id = validated_data.get('article_id')
        article_name = validated_data.get('article_name')
        obj, v = ArticleList.objects.update_or_create(article_id=article_id,
                                                      article_name=article_name,
                                                      defaults=validated_data)
        return obj


class ArticleListQuerySerializer(serializers.Serializer):
    """文章列表查询条件"""
    page = serializers.CharField(required=False)


class ArticleDetailSerializer(serializers.ModelSerializer):
    """文章详情序列化"""

    class Meta:
        model = ArticleDetail
        # exclude = ('updated_date', 'created_date', 'article_id')
        # fields = ('article_id','article_name', 'summary', 'category',
        #           'author', 'tags', 'content', 'publish_time',
        #           'image_url', 'star_count', 'comment_count',
        #           'comment',)
        fields = '__all__'

    def create(self, validated_data):
        """重写父类created方法"""
        article_id = validated_data.get('article_id')
        article_name = validated_data.get('article_name')
        obj, v = ArticleDetail.objects.update_or_create(article_name=article_name,
                                                        article_id=article_id,
                                                        defaults=validated_data)
        return obj


class ArticleDetailQuerySerializer(serializers.Serializer):
    """文章详情查询条件"""
    article_id = serializers.CharField(required=True)


class ArticleCategorySerializer(serializers.ModelSerializer):
    """文章分类序列化"""

    class Meta:
        model = ArticleList
        fields = '__all__'
