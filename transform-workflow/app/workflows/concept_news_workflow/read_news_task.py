# -*- coding: UTF-8 -*-
"""
获取需要分类的新闻
"""
import os

import luigi
from luigi.format import UTF8

from app import settings
from app.db.postgres_query import PostgresQuery
from app.utils.datetime_utils import target_created_date

query_table = 'collecter_recode'
query_string = "select url,words from %s where created_date > '%s'::timestamp" % (query_table,
                                                                                  target_created_date(**settings.TARGET_CREATED_DATE))


class ThemeQuery(PostgresQuery):
    """查询主题表"""
    table = query_table
    query = query_string


class ReadNews(luigi.Task):
    """
    获取新闻
    """

    def requires(self):
        return ThemeQuery()

    def run(self):
        """获取新闻"""
        connection = self.input().connect()
        cursor = connection.cursor()
        cursor.execute(query_string)
        rows = cursor.fetchall()
        with self.output().open('w') as outfile:
            for row in rows:
                outfile.write(
                    '{url}**^**{words}\n'.format(
                        url=row[0],
                        words=row[1],
                    )
                )

    def output(self):
        """获取到的新闻暂存在 target_news.csv 中"""

        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'target_news.csv'), format=UTF8)
