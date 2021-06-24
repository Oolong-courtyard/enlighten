package main

import (
	"blog_backend_go/models"
	"blog_backend_go/pkg/setting"
	"blog_backend_go/pkg/util"
	"fmt"
	"github.com/gin-gonic/gin"
)

func init() {
	setting.Setup()
	models.SetUp()
	util.Setup()

}

func main() {
	//使用 web framework gin 的流程：路由分发-->参数解析-->规则校验-->db交互-->数据处理-->响应返回

	gin.SetMode(setting.ServerSetting.RunMode)
	routersInit := routers.InitRouter()

	// 创建一个默认的路由引擎
	r := gin.Default()
	// 路由组1，处理GET 请求
	v1 := r.Group("/v1")
	{
		v1.GET("/login", login)
	}
	// 启动HTTP服务，默认在0.0.0.0:8080启动服务
	r.Run()
	//
}

// login 函数
func login(c *gin.Context) {
	name := c.DefaultQuery("name", "liuzh")
	c.String(200, fmt.Sprintf("hello %s\n", name))
}
