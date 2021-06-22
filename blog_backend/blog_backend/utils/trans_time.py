import datetime

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def current_time_str():
    now_time = datetime.datetime.now().strftime("%Y-%m-%d").replace("-", "")
    target_dir = os.path.join(os.path.dirname(BASE_DIR) + "/" + now_time)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
    return now_time
