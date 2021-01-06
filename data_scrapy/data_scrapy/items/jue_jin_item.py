# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

from data_scrapy.utils.datetime_utils import timestamp_to_datetime
from data_scrapy.utils.string_utils import to_string

from configs.scrapy_configs import SERVE_BASE_URL


class JueJinArticleListScrapyItem(scrapy.Item):
    """掘金文章列表item"""
    name = 'jue_jin_list'
    request_url = SERVE_BASE_URL + '/article/article-list/'

    article_id = scrapy.Field()
    article_name = scrapy.Field()
    publish_time = scrapy.Field()
    summary = scrapy.Field()
    category = scrapy.Field()
    author = scrapy.Field()
    image = scrapy.Field()
    origin = scrapy.Field()
    scraped_date_time = scrapy.Field()
    content = scrapy.Field()

    def to_request_obj(self):
        """将scrapy item 转换为符合请求的数据格式"""
        trans_data = {
            'article_id': to_string(self.get('article_id')),
            'article_name': to_string(self.get('article_name')),
            'publish_time': to_string(self.get('publish_time')),
            'author': to_string(self.get('author')),
            'category': to_string(self.get('category')),
            'origin': '掘金',
            'scraped_date_time': to_string(self.get('scraped_date_time')),
            'content': to_string(self.get('content'))
        }
        return trans_data


class JueJinArticleDetailScrapyItem(scrapy.Item):
    """掘金文章详情item"""
    name = 'jue_jin_detail'
    request_url = SERVE_BASE_URL + '/article/article-detail/'

    article_id = scrapy.Field()
    article_name = scrapy.Field()
    summary = scrapy.Field()
    category = scrapy.Field()
    publish_time = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    tags = scrapy.Field()

    def to_request_obj(self):
        """将scrapy item 转换为符合请求的数据格式"""
        trans_data = {
            'article_id': to_string(self.get('article_id')),
            'article_name': to_string(self.get('article_name')),
            'publish_time': to_string(self.get('publish_time')),
            'summary': to_string(self.get('summary')),
            'category': to_string(self.get('category')),
            'author': to_string(self.get('author')),
            'content': to_string(self.get('content')),
        }
        return trans_data
