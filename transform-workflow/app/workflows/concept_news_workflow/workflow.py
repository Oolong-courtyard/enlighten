# -*- coding: UTF-8 -*-
"""
task1: 获取概念；
task2: 获取新闻；
task3: 新闻归类到概念
"""
import luigi

from app.workflows.concept_news_workflow.read_concepts_task import ReadConcepts
from app.workflows.concept_news_workflow.read_concepts_label_task import ReadConceptsLabel
from app.workflows.concept_news_workflow.read_news_task import ReadNews
from app.workflows.concept_news_workflow.process_recode_task import ProcessRecode


class NewsWorkflow(object):
    """新闻归类到所属概念"""
    tasks = []

    def __init__(self):
        # self.tasks.append(ReadConcepts()) #暂不需要执行

        self.tasks.append(ReadConceptsLabel())  # 标签中包含了主题名称,无需再单独获取主题名称。
        self.tasks.append(ReadNews())
        self.tasks.append(ProcessRecode())

    def run(self, workers, local_scheduler=True):
        for task in self.tasks:
            luigi.build([task], workers=workers, local_scheduler=local_scheduler)
