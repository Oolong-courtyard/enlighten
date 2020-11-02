import jsonpath
import scrapy


class JuejinSpiderSpider(scrapy.Spider):
    """爬取掘金文章"""
    name = 'jue_jin'
    allowed_domains = ['juejin.im', 'apinew.juejin.im']
    start_urls = [
        'https://apinew.juejin.im/recommend_api/v1/article/recommend_all_feed']
    cursor = "0"
    payloadData = {
        'id_type': 2,
        'client_type': 2608,
        'sort_type': 200,
        'cursor': cursor,
        'limit': 20
    }

    def start_requests(self):
        """重写,起始请求方式为 post"""
        yield scrapy.Request(
            url=self.start_urls[0],
            method='post',
            headers={
                'Referer': 'https://juejin.im/'
            },
            meta=self.payloadData,
            callback=self.parse,
        )

    def parse(self, response):
        print(response)
        res = response.json()
        # 先处理response中的cursor
        next_cursor = res['cursor']
        # 是否有下一页
        has_more = res['has_more']

        # 获取到data之后,数据分析
        # 入库的json数据必须包括但不限于以下四个字段
        # 文章id，标题，作者，分类
        request_data = list()  # 用于向后台发请求时的入库data
        article_id_list = list()  # 存放每一篇文章的article_id,用于爬取文章详情时使用

        for item in res['data']:
            if item['item_type'] != 2:
                continue
            item_dict = dict()
            # TODO 这里定义这个爬虫的item
            item_dict['article_id'] = jsonpath.jsonpath(item, '$..article_id')[
                0]
            # 将article_id添加进列表
            article_id_list.append(item_dict['article_id'])
            item_dict['article_name'] = jsonpath.jsonpath(item, '$..title')[0]
            # if jsonpath.jsonpath(item, '$..cover_image')[0]:
            #     item_dict['image'] = jsonpath.jsonpath(item, '$..cover_image')[0]
            # else:
            #     item_dict['image'] = ''
            item_dict['author'] = jsonpath.jsonpath(item, '$..user_name')[0]
            item_dict['category'] = jsonpath.jsonpath(item, '$..category_name')[
                0]
            request_data.append(item_dict)

        pass
