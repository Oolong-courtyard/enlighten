import {request} from './request'

export function getArticleList() {
  return request({
    url:'/article-detail/'
  })

}
