/*
just 测试使用
 */


package main

import "fmt"

func add(a int) int{
	a = a+1
	return a
}

func main() {
	// & *的区别： &取指针 *取值
	a := 1
	b := add(a)
	fmt.Println(b)
}

