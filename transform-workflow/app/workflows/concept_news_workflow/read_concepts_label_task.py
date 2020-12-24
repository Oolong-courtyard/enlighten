# -*- coding: UTF-8 -*-
"""
获取所有概念对应的标签
"""
import os

import luigi
from luigi.format import UTF8

from app import settings
from app.db.postgres_query import PostgresQuery

query_table = 'collecter_metadata'
query_string = "select content from %s where metadata_name = 'label' " % (query_table)


class ThemeQuery(PostgresQuery):
    """查询主题表"""
    table = query_table
    query = query_string


class ReadConceptsLabel(luigi.Task):
    """
    获取概念对应的标签
    """

    def requires(self):
        return ThemeQuery()

    def run(self):
        connection = self.input().connect()
        cursor = connection.cursor()
        cursor.execute(query_string)
        rows = cursor.fetchall()
        with self.output().open('w') as outfile:
            for row in rows:
                outfile.write(
                    '{content}\n'.format(
                        content=row[0],
                    )
                )

    def output(self):
        """获取到的概念暂存在 concepts_label.csv 中"""

        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'concepts_label.csv'), format=UTF8)
