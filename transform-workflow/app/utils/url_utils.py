
def make_url(host, address, port=None, prefix='https'):
    header = '%s://%s' % (prefix, host)
    if port is not None:
        header = '%s:%s' % (header, port)
    url = '%s/%s' % (header, address)
    return url
