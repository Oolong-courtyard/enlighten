import {request} from './request'

export function getArticleList() {
  return request({
    url: '/article-list/'
  })

}

export function getArticleDetail(id) {
  return request({
    url: '/article-detail' + `article_id=$(id)`
  })

}
