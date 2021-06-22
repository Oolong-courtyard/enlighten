"""
自定义中间件
"""
from django.utils.deprecation import MiddlewareMixin


class MyMiddleWare(MiddlewareMixin):
    def process_request(self, request):
        print("get into mysql middleware")
        r = request.GET

        return r

    #
# def my_middleware(get_response):
#     # 此处编写的代码仅在Django第一次配置和初始化的时候执行一次。
#
#     def process_request(request):
#         print("get into mysql middleware")
#         # 此处编写的代码会在每个请求处理视图前被调用。
#         response = get_response(request)
#         # 此处编写的代码会在每个请求处理视图之后被调用。
#         response['Access-Control-Allow-Origin'] = '*'
#         response['Access-Control-Allow-Headers'] = "content-type"
#         return response
#
#     return process_request
