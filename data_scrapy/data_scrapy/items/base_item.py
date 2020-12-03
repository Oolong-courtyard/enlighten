"""
scrapy_item 基类
"""

import scrapy

from utils import string_utils, decimal_utils


class BaseScrapyItem(scrapy.Item):
    """
    item
    """
    name = 'scrapy'

    def get_str(self, key, default=''):
        """
        将value转换为字符串
        """
        if key in self:
            return string_utils.to_string(self[key])
        else:
            return default

    def get_decimal(self, key, default=0):
        """
        将value转换为数字
        """
        if key in self:
            return decimal_utils.to_decimal(self[key])
        else:
            return default


class BaseItem(BaseScrapyItem):
    """
    item 基类
    """
    name = 'scrapy'

    # define the fields for your item here like:
    url = scrapy.Field()
    title = scrapy.Field()
    intro = scrapy.Field()
    domain = scrapy.Field()
    content = scrapy.Field()
    words = scrapy.Field()
    picture = scrapy.Field()
    hot = scrapy.Field()
    author = scrapy.Field()
    editor = scrapy.Field()
    key_word = scrapy.Field()
    date_time = scrapy.Field()
    scraped_date_time = scrapy.Field()
    publish_time = scrapy.Field()

    def to_request_obj(self):
        if len(self.get_str('content')) > 9999:
            self['content'] = self.get_str('content')[0:9998]
        trans_data = {
            'title': self.get_str('title'),
            'domain': self.get_str('domain'),  # 取config spider allow_domnains的第一个
            'channel': self.name,
            'url': self.get_str('url'),
            'description': self.get_str('intro')[:199] if self.get_str('intro') else '今日报道...',
            'content': self.get_str('content'),
            'words': self.get_str('words'),
            'author': self.get_str('author'),
            'publish_time': self.get_str('publish_time'),
        }
        return trans_data


class MetaItem(BaseScrapyItem):
    """

    """
    name = 'meta'

    # define the fields for your item here like:
    recode_id = scrapy.Field()
    metadata_name = scrapy.Field()
    content = scrapy.Field()

    def to_request_obj(self):
        trans_data = {
            'recode_id': self.get_str('recode_id'),
            'metadata_name': self.get_str('metadata_name'),
            'content': self['content']
        }
        return trans_data


class RecodeMetaItem(BaseScrapyItem):
    name = 'meta'

    # define the fields for your item here like:
    recode_id = scrapy.Field()
    metadata_name = scrapy.Field()

    picture = scrapy.Field()
    hot = scrapy.Field()
    author = scrapy.Field()
    editor = scrapy.Field()
    key_word = scrapy.Field()
    date_time = scrapy.Field()
    scraped_date_time = scrapy.Field()
    source = scrapy.Field()

    def to_request_obj(self):
        data = {
            'recode_id': self.get_str('recode_id'),
            'metadata_name': self.get_str('metadata_name'),
            'content': [self.get_str('picture'),
                        self.get_str('hot'),
                        self.get_str('author'),
                        self.get_str('editor'),
                        self.get_str('key_word'),
                        self.get_str('date_time'),
                        self.get_str('scraped_date_time'),
                        self.get_str('source')]
        }
        return data
