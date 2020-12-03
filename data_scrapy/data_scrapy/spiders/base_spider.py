"""
所有爬虫基类
"""
import json

import scrapy

from configs import scrapy_configs
from items.base_item import MetaItem
from . import theme_spider
# from text_analysis.text_processing import TextProcessing
from utils import request_utils


class BaseSpider(scrapy.Spider):
    """
    提取共用属性如：allowed_domains,start_urls等
    """
    name = 'base'
    allowed_domains = None
    start_urls = None
    text_processing = None
    concepts = None
    next_page = True
    page_num = 1

    # def parse(self, response, **kwargs):
    #     raise NotImplementedError('{}.parse callback is not defined'.format(self.__class__.__name__))

    def start_requests(self, spider_name):

        self.allowed_domains = scrapy_configs.configs('allowed_domains', spider_name)
        self.start_urls = scrapy_configs.configs('start_urls', spider_name)
        self.concepts = theme_spider.read_csv()
        self.text_processing = TextProcessing(scrapy_configs.configs('stopwords_path'),
                                              scrapy_configs.configs('dictionary_path'))
        # 所有的股票名称
        self.stocks = self.get_stocks_from_db()

    def news_classification(self,
                            news_words,
                            news_url,
                            ):
        """
        对新闻内容进行分词处理后分类
        :param news_words:新闻内容分词后列表
        :param news_url:新闻对应的请求地址
        """
        # ===============================================
        # 新闻<--->概念
        # ===============================================
        concept_results = []  # 存概念相关到meta
        categories = self.news_to_categories(news_words, self.concepts)
        # 概念分类
        if not categories:
            return [], []
        categories_item = MetaItem()
        categories_item['recode_id'] = news_url
        categories_item['metadata_name'] = 'categories'
        categories_item['content'] = categories
        # 相关的概念分类为空时不返回item
        concept_results.append(categories_item)
        # 概念分类
        for category in categories:
            category_item = MetaItem()
            category_item['recode_id'] = category
            category_item['metadata_name'] = news_url.split('/')[-1]
            category_item['content'] = [news_url]
            concept_results.append(category_item)

        # ===============================================
        # 新闻<--->股票
        # ===============================================
        stocks_results = []  # 存股票相关到meta
        code_list = []  # 股票code列表
        name_list = []  # 股票name列表
        fullname_list = []  # 股票fullname列表
        for stocks_item in self.stocks:
            name_list.append(stocks_item.get('name'))
            fullname_list.append(stocks_item.get('fullname'))
            # code_list中添加code和SZ或SH的组合字符串
            code_str = stocks_item.get('code')
            if code_str:
                code_list.append(code_str)
                # code_list.append('SZ' + code_str)
                # code_list.append('SZ.' + code_str)
                # code_list.append(code_str + 'SZ')
                # code_list.append(code_str + '.SZ')
                # code_list.append('SH' + code_str)
                # code_list.append('SH.' + code_str)
                # code_list.append(code_str + 'SH')
                # code_list.append(code_str + '.SH')
        # 该新闻分词后的每一个词和股票的每一个code或name或fullname对比
        stocks_final_categories = []
        for stocks_list in [{'code': code_list}, {'name': name_list}, {'fullname': fullname_list}]:
            # stocks_categories的第一个元素为表stocks的查询条件
            stocks_categories = self.news_stocks_categories(news_words, stocks_list)
            if len(stocks_categories) > 1:
                stocks_final_categories.append(stocks_categories)

        # 股票分类返回item
        for each_categories in stocks_final_categories:
            categories_item = MetaItem()
            categories_item['recode_id'] = news_url
            categories_item['metadata_name'] = 'stocks_categories'
            categories_item['content'] = each_categories
            # 相关的股票分类
            stocks_results.append(categories_item)
            # 每只股票对应的新闻
            for category in each_categories[1:]:
                category_item = MetaItem()
                category_item['recode_id'] = category
                category_item['metadata_name'] = news_url.split('/')[-1]
                category_item['content'] = [news_url]
                stocks_results.append(category_item)

        # 只要返回的concept_results为空,那么该条新闻就直接丢弃
        return concept_results, stocks_results

    def news_to_categories(self, words, concepts):
        """
        新闻概念分类
        """
        relevant_categories = {}
        for tokens in words:
            for tk in tokens:
                for concepts_str in concepts:
                    cat_name = concepts_str[0]
                    if len(tk) >= 2 and tk in concepts_str:
                        count = 0
                        if cat_name in relevant_categories:
                            count = relevant_categories[cat_name]
                        count += 1
                        relevant_categories[cat_name] = count
        relevant_categories = sorted(relevant_categories.items(), key=lambda d: d[1], reverse=True)
        if len(relevant_categories) > 3:
            relevant_categories = relevant_categories[0:3]
        relevant_categories = filter(lambda x: x[1] > 2, relevant_categories)
        categories = []
        for cat in relevant_categories:
            categories.append(cat[0])
        return categories

    def news_stocks_categories(self, words, stocks_list):
        """
        新闻股票分类
        :param words:新闻分词后列表
        :param stocks_list:股票list(包括股票code,名称,全称)
        """
        # 基准:遍历股票列表,股票在该新闻中出现三次以上,该新闻和该股票强相关
        relevant_categories = {}
        stocks_item, stocks_child_list = None, None
        for k, v in stocks_list.items():
            stocks_item = k
            stocks_child_list = v
        for each_stocks in stocks_child_list:
            count = 0
            for news_word in words[0]:
                if each_stocks == news_word:
                    count += 1
            if count == 0:
                continue
            relevant_categories[each_stocks] = count
        relevant_categories = sorted(relevant_categories.items(), key=lambda d: d[1], reverse=True)
        if len(relevant_categories) > 5:
            relevant_categories = relevant_categories[0:5]
        relevant_categories = filter(lambda x: x[1] >= 1, relevant_categories)  # 新闻中股票出现1次为相关
        categories = [stocks_item]
        for relevant_category in relevant_categories:
            categories.append(relevant_category[0])
        return categories

    def get_stocks_from_db(self):
        """从db中获取所有股票"""
        json_ls = []
        for resp in request_utils.get(scrapy_configs.configs('stocks_path')):
            json_ls = json.loads(resp.content)
        return json_ls.get('data')
