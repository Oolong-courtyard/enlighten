"""跨模块业务视图序列化器"""

from rest_framework import serializers

from article.models import ArticleList


class ArticleRecommendQuerySerializer(serializers.Serializer):
    """推荐接口查询参数"""
    user_id = serializers.CharField(label="用户id", max_length=100, required=True)


class ArticlePublishViewSerializer(serializers.Serializer):
    """发布文章序列化器"""
    user_id = serializers.CharField(label="用户id", max_length=100, required=True)
    author = serializers.CharField(label="用户名称", max_length=100, required=True)
    content = serializers.CharField(label="文章内容", max_length=9999, required=True)




class StarViewSerializer(serializers.Serializer):
    """点赞数序列化器"""
    user_id = serializers.CharField(label="用户id", max_length=100, required=True)
    article_id = serializers.CharField(label="文章id", max_length=100, required=True)
    action = serializers.ChoiceField(label="用户点赞行为", choices=["0", "1"], write_only=True)

    class Meta:
        fields = ('user_id', 'article_id', 'action')
