package logging

import (
	"log"
	"os"
)

type Level int

var (
	F *os.File

	DefaultPrefix      = ""
	DefaultCallerDepth = 2

	logger     *log.Logger
	logPrefix  = ""
	levelFlags = []string{"DEBUG", "INFO", "WARNING", "ERROR", "FATAL"}
)

const (
	DEBUG Level = iota //每遇到 const 关键字 iota 重置为0
	INFO
	WARNING
	ERROR
	FATAL
)

//Setup initialize the log instance
//func Setup(){
//	var err error
//	filePath := getLogFilePath()
//	fileName := getLogFileName()
//	F,err = file.MustOpen(fileName,filePath)
//}
