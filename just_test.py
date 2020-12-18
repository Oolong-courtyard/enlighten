"""
一些库和功能的测试
"""

import time

timeStamp = 1608267350
timeArray = time.localtime(timeStamp)
otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)

print(otherStyleTime)
