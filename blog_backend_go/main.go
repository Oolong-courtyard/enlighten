package main

import (
	"blog_backend_go/models"
	"blog_backend_go/pkg/gredis"
	"blog_backend_go/pkg/setting"
	"blog_backend_go/pkg/util"
	"blog_backend_go/routers"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func init() {
	setting.Setup()
	models.SetUp()
	gredis.Setup()
	util.Setup()

}

func main() {
	//使用 web framework gin 的流程：路由分发-->参数解析-->规则校验-->db交互-->数据处理-->响应返回
	gin.SetMode(setting.ServerSetting.RunMode)

	routersInit := routers.InitRouter()
	ReadTimeout := setting.ServerSetting.ReadTimeout
	WriteTimeout := setting.ServerSetting.WriteTimeout
	endPoint := fmt.Sprintf("%d", setting.ServerSetting.HttpPort)
	maxHeaderByes := 1 << 20

	server := &http.Server{
		Addr:           ":" + setting.ServerSetting.HttpPort,
		Handler:        routersInit,
		ReadTimeout:    ReadTimeout,
		WriteTimeout:   WriteTimeout,
		MaxHeaderBytes: maxHeaderByes,
	}

	log.Printf("[info] start up server listening %s", endPoint)

	err := server.ListenAndServe()
	if err != nil {
		fmt.Printf("server err:%s", err)
	}
}
