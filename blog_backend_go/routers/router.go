package routers

import (
	"blog_backend_go/middleware/jwt"
	"blog_backend_go/routers/api"
	v1 "blog_backend_go/routers/api/v1"
	"github.com/gin-gonic/gin"
)

//InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.POST("/auth", api.GetAuth)

	apiv1 := r.Group("/api/v1")
	apiv1.Use(jwt.JWT())
	{

		// 获取文章列表
		apiv1.GET("/articles", v1.GetArticles)
		// 新建文章
		apiv1.POST("/articles", v1.AddArticle)
		// 更新指定文章
		apiv1.PUT("/articles/:id", v1.EditArticle)
		// 删除指定文章
		apiv1.DELETE("/articles/:id", v1.DeleteArticle)
	}

	return r

}
