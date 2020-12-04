"""
请求工具
"""
import json

import grequests

from configs import scrapy_configs
from utils.logger_utils import logger

def err_handler(request, exception):
    if scrapy_configs.configs('debug'):
        logger.error(exception)

def get(url):
    if scrapy_configs.configs('debug'):
        logger.info(url)
    req_list = [grequests.request("GET",
                                  url=url,
                                  headers=scrapy_configs.configs('api_headers'),
                                  timeout=10)]
    return grequests.imap(req_list, exception_handler=err_handler)


def post(url, item):
    if scrapy_configs.configs('debug'):
        # logger.info(api_url)
        logger.info(json.dumps(item, ensure_ascii=False))
    req_list = [grequests.request("POST",
                                  url=url,
                                  data=json.dumps(item),
                                  headers=scrapy_configs.configs('api_headers'),
                                  timeout=10)]
    return grequests.imap(req_list, exception_handler=err_handler)
