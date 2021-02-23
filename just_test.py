"""
一些库和功能的测试
"""

import time


# timeStamp = 1608267350
# timeArray = time.localtime(timeStamp)
# otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
#
# print(otherStyleTime)

class Person(object):
    def __init__(self, name):
        self.name = name

    def talk(self):
        print("%s正在交谈" % self.name)


p = Person("laowang")

# n = getattr(p, "name")  # 获取name变量的内存地址
# print(n)  # 此时打印的是:laowang

f = getattr(p, "talk")  # 获取talk方法的内存地址
print(f)
f()  # 调用talk方法

# 我们发现getattr有三个参数，那么第三个参数是做什么用的呢?
# s = getattr(p, "abc", "not find")
# print(s)  # 打印结果：not find。因为abc在对象p中找不到，本应该报错，属性找不到，但因为修改了找不到就输出not find
