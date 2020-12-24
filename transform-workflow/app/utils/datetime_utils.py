import datetime
from pytz import timezone
import time

cst_tz = timezone('Asia/Shanghai')


def current_time():
    return int(round(time.time() * 1000))


def current_datetime(format_string=None):
    now = datetime.datetime.now(cst_tz)
    if format_string is None:
        return now.strftime('%Y%m%d%H%M%S')
    else:
        return now.strftime(format_string)
    pass


def current_date():
    now = datetime.datetime.now(cst_tz)
    return now.strftime('%Y%m%d')
    pass


def compare_with_current(time1, format_s):
    return compare_time(time1, format_s, current_date(), '%Y%m%d')


def compare_time(time1, format_s, time2, format_e):
    s_time = time.mktime(time.strptime(time1, format_s))
    e_time = time.mktime(time.strptime(time2, format_e))
    return int(s_time) - int(e_time)


def target_created_date(**kwargs):
    """返回目标时间点"""
    return (datetime.datetime.now(cst_tz) + datetime.timedelta(**kwargs)).strftime('%Y-%m-%d %H:%M:%S')
