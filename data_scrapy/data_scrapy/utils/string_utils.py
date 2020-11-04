"""
将数据转换为字符串
"""


def to_string(value, default=''):
    """将数据转换为字符串"""
    if value is None:
        return default
    else:
        if isinstance(value, (list, tuple)) and len(value) == 1:
            return str(value[0])
        elif isinstance(value, (list, tuple)) and len(value) == 0:
            return default
        else:
            try:
                return str(value)
            except ValueError:
                return default
