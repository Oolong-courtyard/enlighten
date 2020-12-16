import {request} from './request'

export function getArticleList(page) {
  return request({
    // url: this.$articleListUrl + page.toString()
    url: 'article/article-list/?page=' + page.toString()
  })
}

export function getArticleDetail(id) {
  return request({
    // url: this.$articleDetailUrl + id
    url: 'article/article-detail/' + id
  })
}
