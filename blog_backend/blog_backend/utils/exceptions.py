"""
自定义异常处理信息,保证响应格式一致性;
增加数据库异常处理和redis异常处理等
"""
import logging
import traceback

from django.core.exceptions import ObjectDoesNotExist
from django.db import DatabaseError
from redis.exceptions import RedisError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework import status
from utils.base_response import BaseResponse, BusStatusCode

# 获取在配置文件中定义的logger，用来记录日志
logger = logging.getLogger('django')


def exception_handler(exc, context):
    """
    自定义异常处理
    :param exc: 异常
    :param context: 抛出异常的上下文
    :return: Response响应对象
    """
    # 调用drf框架原生的异常处理方法
    response = drf_exception_handler(exc, context)
    # 控制台打印出报错的栈信息
    traceback.print_exc()

    if response is None:
        view = context['view']
        if isinstance(exc, DatabaseError) or isinstance(exc, RedisError):
            # 数据库异常
            logger.error('[%s] %s' % (view, exc))
            response = BaseResponse(**BusStatusCode.INTERNAL_SERVER_ERROR_5001,
                                    status=status.HTTP_507_INSUFFICIENT_STORAGE)
        elif isinstance(exc, ObjectDoesNotExist):
            # 数据查询不到异常
            logger.error('[%s] %s' % (view, exc))
            response = BaseResponse(**BusStatusCode.BAD_REQUEST_4004,
                                    status=status.HTTP_404_NOT_FOUND)
        else:
            logger.error('[%s] %s' % (view, exc))
            response = BaseResponse(code=65535,
                                    message="服务器异常",
                                    data="",
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        logger.error(' %s' % (exc,))
        if isinstance(exc, AuthenticationFailed):
            # token认证失败
            response = BaseResponse(**BusStatusCode.BAD_REQUEST_4008,
                                    status=status.HTTP_403_FORBIDDEN)

    return response
