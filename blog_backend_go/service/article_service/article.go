package article_service

import "blog_backend_go/models"

type Article struct {
	ID            int
	TagID         int
	Title         string
	Desc          string
	Content       string
	CoverImageUrl string
	State         int
	CreatedBy     string
	ModifiedBy    string

	PageNum  int
	PageSize int
}

//a 变量是指针类型
func (a *Article) Add() error {
	//需要写 新增文章的接口
	article := map[string]interface{}{
		"tag_id":          a.TagID,
		"title":           a.Title,
		"desc":            a.Desc,
		"content":         a.Content,
		"cover_image_url": a.CoverImageUrl,
		"state":           a.State,
		"created_by":      a.CreatedBy,
	}

	if err := models.AddArticle(article); err != nil {
		return err
	}

	return nil

}
