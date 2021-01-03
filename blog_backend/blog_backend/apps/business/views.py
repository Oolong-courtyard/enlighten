"""跨模块业务"""
import datetime

import shortuuid
from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from article.models import ArticleList
from business.serializers import (
    StarViewSerializer,
    ArticleRecommendQuerySerializer, ArticlePublishViewSerializer,
)
from users.models import UserStar, UserPublish
from utils.base_response import BaseResponse, BusStatusCode
from utils.exceptions import logger
from utils.user_auth import UserAuth


# 文章推荐
class ArticleRecommendView(APIView):
    """
    文章推荐(用户必须是登录状态)
    用户登录,根据用户历史喜好推荐文章；
    用户未登录，直接推荐热榜
    """
    x_token = openapi.Parameter('x-token', openapi.IN_HEADER, description='认证token', type=openapi.TYPE_STRING, required=True)
    authentication_classes = [UserAuth]

    @swagger_auto_schema(
        operation_summary="获取推荐文章列表",
        query_serializer=ArticleRecommendQuerySerializer,
    )
    def get_commend_list(self, request):
        """获取推荐文章列表"""
        pass


# 发布文章
class ArticlePublishView(APIView):
    """发布文章"""
    x_token = openapi.Parameter('x-token', openapi.IN_HEADER, description='认证token', type=openapi.TYPE_STRING, required=True)
    authentication_classes = [UserAuth]

    @swagger_auto_schema(
        operation_summary="发布文章",
        manual_parameters=[x_token],
        request_body=ArticlePublishViewSerializer,
    )
    def post(self, request):
        """新增文章"""
        request_data = request.data
        # 生成文章id(uuid)
        user_id = request_data.get("user_id")
        article_id = shortuuid.uuid()
        article_name = request_data.get("content").split("\n")[0]
        author = request_data.get("author")
        origin = "enlighten"
        content = request_data.get("content")
        publish_time = datetime.datetime.now().strftime('%Y%m%d %H-%M-%S')
        article_dict = {
            "article_id": article_id,
            "article_name": article_name,
            "author": author,
            "origin": origin,
            "content": content,
            "publish_time": publish_time,
        }
        # 显式地开启一个事务
        with transaction.atomic():
            # 创建事务保存点
            save_id = transaction.savepoint()
            try:
                # UserPublish更新该用户的发布文章列表
                pub_res = UserPublish.objects.get(user_id=user_id)
                UserPublish.objects.create(user_id=user_id, article_id=pub_res.article_id.append(article_id))
                # 文章表加一条记录
                ArticleList.objects.create(**article_dict)
            except Exception as e:
                logger.info(e)
                # 点赞失败回滚到保存点
                transaction.savepoint_rollback(save_id)
                return BaseResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                    **BusStatusCode.INTERNAL_SERVER_ERROR_5001,
                                    )
        # 点赞成功,提交从保存点到当前状态的所有数据库事务操作
        transaction.savepoint_commit(save_id)
        return BaseResponse(detail="文章发布成功")


# 文章点赞
class StarView(APIView):
    """
    文章点赞
    用户点赞表 (UserStar)
    文章表(ArticleList)
    """
    x_token = openapi.Parameter('x-token', openapi.IN_HEADER, description='认证token', type=openapi.TYPE_STRING, required=True)

    # 自定义认证类
    authentication_classes = [UserAuth]

    @swagger_auto_schema(
        operation_summary="点赞数修改",
        manual_parameters=[x_token],
        request_body=StarViewSerializer,
    )
    def put(self, request):
        """点赞数修改"""
        # 使用数据库事务，保证双表数据修改的一致性
        user_id = request.data.get("user_id")
        article_id = request.data.get("article_id")
        action = request.data.get("action")
        # TODO 如何增加数据校验
        # low 手动数据校验
        if not all([user_id, article_id, action]):
            return BaseResponse(status=status.HTTP_400_BAD_REQUEST,
                                detail="缺少必须参数"
                                )
        if action == "1":
            # 点赞
            try:
                res = UserStar.objects.get(user_id=user_id)
                if article_id not in res.article_id:
                    with transaction.atomic():
                        save_id = transaction.savepoint()
                        try:
                            # 用户点赞表，将该文章id添加到article_id列表中
                            res.article_id.append(article_id)
                            UserStar.objects.filter(user_id=user_id).update(article_id=res.article_id)
                            # 文章表，将该文章star_count加1
                            article_res = ArticleList.objects.get(article_id=article_id)
                            ArticleList.objects.filter(article_id=article_id).update(star_count=int(article_res.star_count) + 1)
                        except Exception as e:
                            logger.info(e)
                            transaction.savepoint_rollback(save_id)
                            return BaseResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                                **BusStatusCode.INTERNAL_SERVER_ERROR_5001,
                                                )
                        transaction.savepoint_commit(save_id)
                        return BaseResponse(detail="点赞成功")

                # 如果传递过来的文章id在res中，不做操作
                return BaseResponse(status=status.HTTP_400_BAD_REQUEST,
                                    detail="你已点赞过该文章,无法再次点赞",
                                    )
            except UserStar.DoesNotExist:
                """这里使用数据库事务"""
                # 显式地开启一个事务
                with transaction.atomic():
                    # 创建事务保存点
                    save_id = transaction.savepoint()
                    try:
                        # 用户从未点过赞,用户点赞表中将该文章id加入，然后存进db;
                        UserStar.objects.create(user_id=user_id, article_id=[article_id])
                        # 该文章表star_count加1
                        article_res = ArticleList.objects.get(article_id=article_id)
                        ArticleList.objects.filter(article_id=article_id).update(star_count=int(article_res.star_count) + 1)
                    except Exception as e:
                        logger.info(e)
                        # 点赞失败回滚到保存点
                        transaction.savepoint_rollback(save_id)
                        return BaseResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                            **BusStatusCode.INTERNAL_SERVER_ERROR_5001,
                                            )
                # 点赞成功,提交从保存点到当前状态的所有数据库事务操作
                transaction.savepoint_commit(save_id)
                return BaseResponse(detail="点赞成功")

        elif action == "0":
            # 取消点赞
            try:
                res = UserStar.objects.get(user_id=user_id)
                # 该文章id在点赞文章id列表中
                if article_id in res.article_id:
                    with transaction.atomic():
                        save_id = transaction.savepoint()
                        try:
                            # 用户点赞表,将该文章id从文章id列表中删除
                            res.article_id.remove(article_id)
                            UserStar.objects.filter(user_id=user_id).update(article_id=res.article_id)
                            # 文章表，该文章star_count减1
                            article_res = ArticleList.objects.get(article_id=article_id)
                            if int(article_res.star_count) > 0:
                                ArticleList.objects.filter(article_id=article_id).update(star_count=int(article_res.star_count) - 1)
                        except Exception as e:
                            logger.info(e)
                            transaction.savepoint_rollback(save_id)
                            return BaseResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                                **BusStatusCode.INTERNAL_SERVER_ERROR_5001,
                                                )
                        # 取消点赞成功
                        transaction.savepoint_commit(save_id)
                        return BaseResponse(detail="取消点赞成功")
                # 该文章id不在点赞文章id列表中
                return BaseResponse(status=status.HTTP_400_BAD_REQUEST,
                                    **BusStatusCode.BAD_REQUEST_4010,
                                    )
            except UserStar.DoesNotExist:
                # 如果用户点赞表中未查询到该用户id,说明该用户从未给任何文章点过赞,此时文章表中star_count也不用减1.因此不用做任何操作
                return BaseResponse(status=status.HTTP_400_BAD_REQUEST,
                                    **BusStatusCode.BAD_REQUEST_4010,
                                    )
        else:
            return BaseResponse(status=status.HTTP_400_BAD_REQUEST,
                                detail="操作失败,action只能为`0`或者`1`")
