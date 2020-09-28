import {request} from './request'

export function getArticleList(id) {
  return request({
    url: '/article-list/'
  })
}

export function getArticleDetail(id) {
  return request({
    url: '/article-detail/' + id
  })
}
