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
