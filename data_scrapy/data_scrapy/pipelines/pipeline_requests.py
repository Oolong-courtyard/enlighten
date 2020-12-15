"""
请求api将爬取到的数据存入db中
"""
import json

import requests
import scrapy
import grequests


class DataScrapyRequestPipeline(object):
    process = True

    def __init__(self):
        pass

    def open_spider(self, spider):
        self.process = True

    def process_item(self, item, spider):
        # TODO 如何控制这里请求的启动和停止?
        self.process = True

        print('此时的item为', item)
        print('此时的spider是', spider.name)
        # 1.拼接请求的url,组织request_data,发送请求存入数据
        req_list = [grequests.request("POST",
                                      url=item.request_url,
                                      headers={'content-type': 'application/json; charset=utf-8'},
                                      data=json.dumps(item.to_request_obj()),
                                      timeout=1000)]
        grequests.map(req_list)
        return item
