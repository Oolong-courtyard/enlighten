# -*- coding: UTF-8 -*-
"""
新闻归类到所属概念
"""

import json
import os

import luigi
from luigi.format import UTF8

from app import settings
from app.text_analysis.text_processing import TextProcessing
from app.utils import url_utils
from app.utils import request_utils


class ConceptsLabel(luigi.Task):
    """输出概念"""

    def output(self):
        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'concepts_label.csv'), format=UTF8)


class TargetNews(luigi.Task):
    """输出需要分类的新闻"""

    def output(self):
        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'target_news.csv'), format=UTF8)


class ProcessRecode(luigi.Task):
    """新闻归类到所属概念"""

    def __init__(self):
        super().__init__()
        self.text_processing = TextProcessing(settings.STOPWORDS_PATH,
                                              settings.DICTIONARY_PATH)

    def requires(self):
        """读取概念和新闻"""

        return ConceptsLabel(), TargetNews()

    def run(self):
        # 从文件中读取新闻列表:[url1,url2,url3,...]
        news_list = []
        # 概念列表
        concepts_list = []

        # 将文件中概念转换为json格式
        for item in self.input():
            if item.fn.endswith('concepts_label.csv'):
                # 对概念处理
                with item.open('r') as f:
                    con_list = f.read().splitlines()
                    for index, each_cate in enumerate(con_list):
                        each_cate = each_cate.replace("'", '"')
                        con_list[index] = json.loads(each_cate)
                    concepts_list = con_list

        # 将文件中新闻url和words区分开
        for item in self.input():
            if item.fn.endswith('target_news.csv'):
                # 对新闻处理
                with item.open('r') as f:
                    target_news = f.read().splitlines()
                    for each_news in target_news:
                        news_url, news_words = each_news.split('**^**')
                        news_list.append([news_url, news_words])

        # 分词后的news_words列表
        for every_news in news_list:
            # 新闻归类到概念
            every_news_url = every_news[0]  # 新闻url
            jieba_news_words = self.text_processing.jieba_tokenize([every_news[1]])  # 新闻words分词后列表
            # 获取该新闻所属分类
            relevant_categories = self.news_to_categories(jieba_news_words, concepts_list)
            if relevant_categories:
                # 请求后台的url,将分类数据存储到metadata表中
                url = url_utils.make_url(host=settings.configs('data_api_host'),
                                         address=settings.configs('meta_api_address'),
                                         port=settings.configs('data_api_port'),
                                         prefix=settings.configs('data_api_prefix'),
                                         )

                # 无需判断meta表中目标新闻是否已经分过类,meta表为created_or_update
                for req in request_utils.post(url,
                                              {
                                                  "recode_id": every_news_url,
                                                  "metadata_name": "categories",
                                                  "content": relevant_categories
                                              }):
                    pass
                for each_category in relevant_categories:
                    for req in request_utils.post(url,
                                                  {
                                                      "recode_id": each_category,
                                                      "metadata_name": every_news_url.split('/')[-1],
                                                      "content": [every_news_url]
                                                  }):
                        pass

            # 结束

    def output(self):
        """
        Returns the target output for this task.
        In this case, a successful execution of this task will create a file on the local filesystem.
        :return: the target output for this task.
        :rtype: object (:py:class:`luigi.target.Target`)
        """
        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'success_1.csv'), format=UTF8)

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


@luigi.Task.event_handler(luigi.Event.SUCCESS)
def celebrate_success(task):
    """Will be called directly after a successful execution
       of `run` on any Task subclass (i.e. all luigi Tasks)
    """
    if isinstance(task, ProcessRecode):
        tmp_path = os.path.join(settings.BASE_PATH, 'tmp')
        if os.path.exists(tmp_path):
            import shutil
            shutil.rmtree(tmp_path)
