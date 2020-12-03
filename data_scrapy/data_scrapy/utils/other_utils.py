"""
共通方法
"""
from utils import request_utils

def read_csv():
    json_ls = []
    for resp in request_utils.get(scrapy_configs.configs('concept_path')):
        json_ls = json.loads(resp.content)
    return json_ls