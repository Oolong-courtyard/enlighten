"""任务管理"""


class TaskManager(object):
    workflows = []

    def luigi_run(self, workflow):
        workflow_instance = workflow()
        workflow_instance.run(workers=10)
        self.workflows.append('')
