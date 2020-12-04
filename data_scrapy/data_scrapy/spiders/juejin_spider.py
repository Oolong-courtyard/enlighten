"""
掘金
"""
import json
import time

import jsonpath
import scrapy

from items.jue_jin_item import JueJinArticleListScrapyItem, JueJinArticleDetailScrapyItem
from utils import datetime_utils


class JueJinSpiderSpider(scrapy.Spider):
    """爬取掘金文章"""
    name = 'jue_jin'
    allowed_domains = ['juejin.im', 'apinew.juejin.im']
    # start_urls = [
    #     'https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed']
    headers = {
        # ':authority':'apinew.juejin.im',
        # ':method':'POST',
        # ':path':'/recommend_api/v1/article/recommend_all_feed',
        # ':scheme':'https',
        # 'accept':'*/*',
        # 'accept-encoding':'gzip, deflate, br',
        # 'accept-language':'zh-CN,zh;q=0.9',
        # 'content-length':'72',
        'cookie': '_ga=GA1.2.1005496246.1604048791; MONITOR_WEB_ID=c13b670e-97b2-459b-8f9f-34a739dc622a; passport_csrf_token=3f96e25f390bf6a62a37028eb6b1f657; passport_auth_status=0ec5a2da5f2354e44047049d0a74b801%2C; sid_guard=d8da244e494591d5de8fbac795c067c7%7C1604051095%7C5184000%7CTue%2C+29-Dec-2020+09%3A44%3A55+GMT; uid_tt=06b42aef65a3e9b567bc00822dd80674; uid_tt_ss=06b42aef65a3e9b567bc00822dd80674; sid_tt=d8da244e494591d5de8fbac795c067c7; sessionid=d8da244e494591d5de8fbac795c067c7; sessionid_ss=d8da244e494591d5de8fbac795c067c7; _gid=GA1.2.1224112918.1604305172',
        # 'origin': 'https://juejin.im',
        # 'referer': 'https://juejin.im/',
        'user-agent': 'PostmanRuntime/7.26.5',
        'content-type': 'application/json',
        # 'sec-fetch-dest': 'empty',
        # 'sec-fetch-mode': 'cors',
        # 'sec-fetch-site': 'same-site',
    }
    payloadData = {
        'id_type': 2,
        'client_type': 2608,
        'sort_type': 200,
        'cursor': 'eyJ2IjoiNjg5MTA1MzQ0MjUzMDI3OTQzMiIsImkiOjQwfQ==',
        'limit': 20
    }
    num = 0

    def start_requests(self):
        """重写,起始请求方式为 post"""
        yield scrapy.Request(
            url='https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed',
            dont_filter=True,
            method='post',
            headers=self.headers,
            body=json.dumps(self.payloadData),
            # meta=self.payloadData,
            callback=self.parse,
        )

    def parse(self, response, **kwargs):
        """解析文章列表"""
        res = response.json()
        time.sleep(0.1)
        # 获取到data之后,数据分析
        # 入库的json数据必须包括但不限于以下四个字段
        # 文章id，标题，作者，分类

        for data_item in res['data']:
            if data_item['item_type'] != 2:
                continue
            item = JueJinArticleListScrapyItem()
            item['article_id'] = jsonpath.jsonpath(data_item, '$..article_id')[0]
            item['article_name'] = jsonpath.jsonpath(data_item, '$..title')[0]
            item['author'] = jsonpath.jsonpath(data_item, '$..user_name')[0]
            item['category'] = jsonpath.jsonpath(data_item, '$..category_name')[0]
            item['scraped_date_time'] = datetime_utils.current_datetime()
            yield item
            yield scrapy.Request(
                url='https://juejin.im/post/' + item['article_id'],
                meta={'item': item},
                callback=self.parse_article_detail,
            )

        # 是否有下一页
        has_more = res['has_more']
        self.num += 1
        if has_more and self.num < 2500:
            # 处理response中的cursor
            next_cursor = res['cursor']
            self.payloadData['cursor'] = next_cursor
            yield scrapy.Request(
                url='https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed',
                dont_filter=True,
                method='post',
                headers=self.headers,
                body=json.dumps(self.payloadData),
                callback=self.parse,
            )

    def parse_article_detail(self, response, **kwargs):
        """解析文章详情"""
        list_item = response.meta['item']
        detail_content = response.xpath('//*[@id="juejin"]/div[2]/main/div/div[1]/article/div[5]/div[1]').extract_first()
        if detail_content is None:
            detail_content = response.xpath('//*[@id="juejin"]/div[2]/main/div/div[1]/article/div[4]/div[1]').extract_first()
        item = JueJinArticleDetailScrapyItem()
        item['article_id'] = list_item['article_id']
        item['article_name'] = list_item['article_name']
        item['author'] = list_item['author']
        item['category'] = list_item['category']
        item['content'] = detail_content
        yield item
