"""
所有API接口返回标准化
"""
from rest_framework.response import Response
from rest_framework import status


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
        self.data = {"code": code, "message": message, "data": data}
        self.template_name = template_name
        self.headers = headers
        self.exception = exception
        self.content_type = content_type

        if headers:
            for name, value in headers.items():
                self[name] = value
