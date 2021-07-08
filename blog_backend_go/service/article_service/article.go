package article_service

import (
	"blog_backend_go/models"
	"blog_backend_go/pkg/gredis"
	"blog_backend_go/pkg/setting"
	"blog_backend_go/service/cache_service"
	"encoding/json"
	"fmt"
)

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

//Add 新增文章的接口
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

func (a *Article) Count() (int, error) {
	return models.GetArticleTotal(a.getMaps())
}

func (a *Article) GetAll() ([]*models.Article, error) {
	var (
		articles, cacheArticles []*models.Article
	)

	cache := cache_service.Article{
		TagID: a.TagID,
		State: a.State,

		PageNum:  a.PageNum,
		PageSize: a.PageSize,
	}
	key := cache.GetArticlesKey()
	if gredis.Exists(key) {
		data, err := gredis.Get(key)
		if err != nil {
			fmt.Println(err)
		} else {
			json.Unmarshal(data, &cacheArticles)
			return cacheArticles, nil
		}
	}

	articles, err := models.GetArticles(a.PageNum, a.PageSize, a.getMaps())
	if err != nil {
		return nil, err
	}
	gredis.Set(key, articles, setting.RedisSetting.RedisExpiredIn)
	return articles, nil

}

func (a *Article) getMaps() map[string]interface{} {
	maps := make(map[string]interface{})
	maps["deleted_on"] = 0
	if a.State != -1 {
		maps["state"] = a.State
	}

	if a.TagID != -1 {
		maps["tag_id"] = a.TagID
	}
	return maps
}

func (a *Article) ExistByID() (bool, error) {
	return models.ExistArticleByID(a.ID)
}

func (a *Article) Edit() error {
	return models.EditArticle(a.ID, map[string]interface{}{
		"tag_id":          a.TagID,
		"title":           a.Title,
		"desc":            a.Desc,
		"content":         a.Content,
		"cover_image_url": a.CoverImageUrl,
		"state":           a.State,
		"modified_by":     a.ModifiedBy,
	})
}
