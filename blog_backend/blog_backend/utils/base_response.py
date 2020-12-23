"""
所有API接口响应数据标准化;
业务响应状态码;
"""
import logging

from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger('django')


class BaseResponse(Response):
    """
    统一响应数据格式
    """

    def __init__(self,
                 *,
                 code=1000,
                 message="ok",
                 data=None,
                 status=status.HTTP_200_OK,
                 template_name=None,
                 headers=None,
                 exception=False,
                 content_type="application/json"):
        super().__init__(status=status)
        self.status = status
        self.data = {"code": code, "message": message, "data": data}
        self.template_name = template_name
        self.headers = headers
        self.exception = exception
        self.content_type = content_type
        # 控制台打印返回的数据
        logger.info(self.data["message"])

        if headers:
            for name, value in headers.items():
                self[name] = value


class BusStatusCode:
    """
    业务响应状态码;
    后续根据需要添加业务状态码
    """

    # 正常
    OK_1001 = {"code": 1001, "message": "响应正常"}

    # 客户端异常
    BAD_REQUEST_4001 = {"code": 4001, "message": "两次密码不一致"}
    BAD_REQUEST_4002 = {"code": 4002, "message": "手机号格式错误"}
    BAD_REQUEST_4004 = {"code": 4004, "message": "数据对象不存在"}
    BAD_REQUEST_4006 = {"code": 4006, "message": "密码格式错误"}
    BAD_REQUEST_4007 = {"code": 4007, "message": "密码校验失败"}
    BAD_REQUEST_4008 = {"code": 4008, "message": "token验证失败"}
    BAD_REQUEST_4009 = {"code": 4009, "message": "点赞/取消点赞失败"}
    BAD_REQUEST_4010 = {"code": 4010, "message": "未查询到该用户对文章的点赞记录,无法取消点赞"}

    # 服务端异常
    INTERNAL_SERVER_ERROR_5001 = {"code": 5001, "message": "数据库错误"}
    INTERNAL_SERVER_ERROR_5002 = {"code": 5002, "message": "服务器错误"}
