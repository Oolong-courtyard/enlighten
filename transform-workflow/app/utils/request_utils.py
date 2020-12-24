import json

import grequests


def err_handler(request, exception):
    print(exception)


def get(url):
    req_list = [grequests.request("GET",
                                  url=url,
                                  headers={'Content-Type': 'application/json'},
                                  timeout=10)]
    return grequests.imap(req_list, exception_handler=err_handler)


def post(url, item):
    req_list = [grequests.request("POST",
                                  url=url,
                                  data=json.dumps(item),
                                  headers={'Content-Type': 'application/json'},
                                  timeout=10)]
    return grequests.imap(req_list, exception_handler=err_handler)
