"""
主入口
"""
import os

try:
    import gevent
    from gevent import monkey

    monkey.patch_all(thread=False, select=False)
    from gevent.pool import Pool
except ImportError:
    raise RuntimeError('Gevent is required.')

import app.workflows.concept_news_workflow as news
from app.task_manager import TaskManager


def execute(workflow_name=''):
    workflows = {
        'article_recommend': news.workflow.NewsWorkflow,
    }
    workflow = workflows[workflow_name]
    for (k, v) in workflows.items():
        if 'workflow' in os.environ and k == os.environ['workflow']:
            workflow = v
            break
    task_manager = TaskManager()
    task_manager.luigi_run(workflow)


if __name__ == '__main__':
    execute('article_recommend')
