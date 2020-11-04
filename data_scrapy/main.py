# -*- coding: UTF-8 -*-
#
# from scrapy.cmdline import execute
#
# if __name__ == '__main__':
#
#     execute(['scrapy', 'crawl', 'jue_jin'])
import os
import sys

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

if __name__ == '__main__':
    # 将同级的data_scrapy加入项目的搜索包路径中
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, os.path.join(BASE_DIR, 'data_scrapy'))
    # 获取项目配置
    setting = get_project_settings()
    process = CrawlerProcess(settings=setting)
    process.crawl('jue_jin')  # 指定运行的爬虫名称
    process.start()
