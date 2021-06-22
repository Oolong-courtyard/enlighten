package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
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

