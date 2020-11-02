# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

import scrapy


class DataScrapyPipeline:
    name = 'juejin_spider'

    article_id = scrapy.Field()
    article_name = scrapy.Field()
    author = scrapy.Field()
    category = scrapy.Field()

    def process_item(self, item, spider):
        #TODO 改写处理爬虫item的方法
        return item
