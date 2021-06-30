package v1

import (
	"blog_backend_go/pkg/app"
	"blog_backend_go/pkg/e"
	"github.com/gin-gonic/gin"
)

type AddArticleForm struct {
	TagID int `form:"tag_id" valid:"Required;Min(1)"`
	Tile string `form:"title" valid:"Required;MaxSize(100)"`
	Desc string `form:"desc" valid:"Required;MaxSize(255)"`
	Content string `form:"content" valid:"Required:MaxSize(65535)"`
	CreatedBy string `form:"created_by" valid:"Required;MaxSize(100)"`
	CoverImageUrl string `form:"cover_image_url" valid:"Required;MaxSize(255)"`
	State int `form:"state" valid:"Range(0,1)"`
}


func AddArticle(c *gin.Context) {
	var (
		appG = app.Gin{C:c}
		form AddArticleForm
	)
	// & 取某个变量的地址
	httpCode,errCode := app.BindAndValid(c,&form)
	if errCode != e.SUCCESS {
		appG.Response(httpCode,errCode,nil)
		return
	}

	//TODO tag 部分先省略,后续再补充

	article_service.Article{

	}


}