"""
基于APScheduler实现的定时任务：
    主要是每天爬取部分最新的文章
"""

from apscheduler.schedulers.blocking import BlockingScheduler
from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.jobstores.mongodb import MongoDBJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor

# jobstores = {
#     'enlighten_scrapy': MongoDBJobStore(),
# }
#
# executors = {
#     'default': ThreadPoolExecutor(20),
#     'processpool': ProcessPoolExecutor(5)
# }
#
# job_defaults = {
#     'coalesce': False,
#     'max_instances': 3
# }

# scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors, job_defaults=job_defaults, timezone=utc)
scheduler = BlockingScheduler()


def job1():
    from main import main
    print("=======启动了爬虫=======")
    main("jue_jin")


# 每天 2 点运行
scheduler.add_job(job1, "cron", hour=18, minute=45)
scheduler.start()
