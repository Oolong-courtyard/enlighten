package routers

import (
	"blog_backend_go/routers/api"
	"github.com/gin-gonic/gin"
)

//InitRouter initialize routing information
func InitRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.POST("/auth", api.GetAuth)

}
