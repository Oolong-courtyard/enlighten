package app

import (
	"fmt"
	"github.com/astaxie/beego/validation"
)

//MarkErrors logs error logs
func MarkErrors(errors []*validation.Error) {
	for _, err := range errors {
		fmt.Println(err.Key, err.Message)
		//logging.Info(err.Key, err.Message)
	}
}
