import {request} from './request'

export function getArticleList(page) {
  return request({
    url: 'article/article-list/?page=' + page.toString()
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/article-detail/' + id
  })
}
