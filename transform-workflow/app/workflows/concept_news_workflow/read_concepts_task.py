# -*- coding: UTF-8 -*-
"""
获取所有概念
"""
import os

import luigi
from luigi.format import UTF8

from app import settings
from app.db.postgres_query import PostgresQuery

query_table = 'collecter_theme'
query_string = 'select theme_id, theme_name from %s' % query_table


class ThemeQuery(PostgresQuery):
    """查询主题表"""
    table = query_table
    query = query_string


class ReadConcepts(luigi.Task):
    """
    获取概念
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
                    '{id},{name}\n'.format(
                        id=row[0],
                        name=row[1],
                    )
                )

    def output(self):
        """获取到的概念暂存在 all_themes.csv 中"""
        return luigi.LocalTarget(os.path.join(settings.BASE_PATH, 'tmp', 'concepts.csv'), format=UTF8)
