# -*- coding: UTF-8 -*-
"""
spider入口
"""

import os
import sys

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from spiders.juejin_spider import JueJinSpiderSpider

# 将同级的data_scrapy加入项目的搜索包路径中
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(BASE_DIR, 'data_scrapy'))


def main(name='jue_jin'):
    """入口"""
    # 获取项目配置
    setting = get_project_settings()
    # 所有爬虫
    spiders = {
        'jue_jin': JueJinSpiderSpider,
    }
    spider_name = name
    for k, v in spiders.items():
        # 线上可以指定特定的爬虫运行
        if 'spider' in os.environ and os.environ['spider'] == k:
            spider_name = k
            break
    process = CrawlerProcess(settings=setting)
    process.crawl(spider_name)  # 指定运行的爬虫名称
    process.start()


if __name__ == '__main__':
    main()
