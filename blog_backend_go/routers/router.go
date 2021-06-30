package routers

import (
	"blog_backend_go/middleware/jwt"
	"blog_backend_go/routers/api"
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
		apiv1.POST("articles",v1.AddArticle)
		// 新建文章
		apiv1.POST("articles",AddArticle)
	}

	return r

}
