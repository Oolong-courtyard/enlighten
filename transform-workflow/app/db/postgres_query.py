"""
数据库连接地址
"""
from luigi.contrib import postgres

from app import settings


class PostgresQuery(postgres.PostgresQuery):
    """db连接地址"""
    host = settings.DATABASES['default']['HOST']
    database = settings.DATABASES['default']['NAME']
    user = settings.DATABASES['default']['USER']
    password = settings.DATABASES['default']['PASSWORD']
    port = settings.DATABASES['default']['PORT']
    table = ''
    query = ''
