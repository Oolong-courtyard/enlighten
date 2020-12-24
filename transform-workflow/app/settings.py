"""
项目配置
"""
import os

from app.config import Settings

ENV_VAR = 'SETTINGS_MODULE'

BASE_PATH = os.path.join(os.path.abspath('./'))

DEVELOP = True
if DEVELOP:
    api_domain = '106.15.8.3'
    api_port = 8000
    api_prefix = 'http'
else:
    api_domain = '106.15.8.3'
    api_prefix = 'http'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'enlighten_db',
        'USER': 'postgres',
        'PASSWORD': 'gresql',
        'HOST': '106.15.8.3',
        'PORT': '5432',
    }
}

DATA_API_PREFIX = api_prefix
DATA_API_HOST = api_domain
DATA_API_PORT = '8000'

# jieba停词
# STOPWORDS_PATH = os.path.join(os.getcwd(), 'app', 'text_analysis', 'Chinese_Stop_Words.txt')
# jieba用户词典
# DICTIONARY_PATH = os.path.join(os.getcwd(), 'app', 'text_analysis', 'finance_dict.txt')

# 获取指定时间点新闻
TARGET_CREATED_DATE = {"days": -1}


def configs(config_name, default=''):
    # config from settings
    settings_obj = Settings()
    settings_module_path = os.environ.get(ENV_VAR, 'app.settings')
    settings_obj.setmodule(settings_module_path, priority='project')
    return configs_from_os(config_name, settings_obj, default)
    pass


def configs_from_os(config_name, settings_obj, default):
    if config_name in os.environ:
        return os.environ[config_name]
    else:
        return settings_obj.get(config_name.upper(), default)
