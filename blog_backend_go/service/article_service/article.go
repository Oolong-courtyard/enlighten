package article_service




type Article struct {
	ID int
	TagID int
	Title string
	Desc string
	Content string
	CoverImageUrl string
	State int
	CreatedBy string
	ModifiedBy string

	PageNum int
	PageSize int
}

//a 变量是指针类型
func (a *Article) Add() error  {
	//需要写 新增文章的接口

}