export const IP_CONFIG = "http://127.0.0.1:8002/api/v1"
export const IP_BASE = "http://127.0.0.1:8002"
// export const IP_CONFIG = "http://api.test.com/api/v1"
// export const IP_CONFIG = "http://192.168.202.38:8001/api/v1"
// export const IP_CONFIG = "http://192.168.201.185:8000/api/v1"
// export const IP_CONFIG2 = "http://192.168.205.18:8101/api/v1"
// export const IP_CONFIG = "http://192.168.205.19:8010/api/v1"
// export const IP_CONFIG = "http://192.168.205.17:8002/api/v1"
// export const IP_CONFIG = "https://www.fastmock.site/mock/5144ea56c6ec8052b1701dbcfce5b356/aishu"

export const TEST_AXIOS_API = "/fap/api/questionGetV2" //测试axios封装api
export const UPLOAD_INIT = "/file/upload_init" //测试axios封装api
export const UPLOAD_COMPLETE = "/file/upload_complete" //测试axios封装api
export const TERM_LIST = "/business/terms" //development term一览检索API
export const MGR_TERM_CHANGE = "/terms/mgr_term_change" //mock 管理员term修改API
export const MGR_TERM_ADD = "/v1/business/terms" //mock 管理员term新建API
export const MGR_TERM_DELETE = "/v1/manager/mgr_term_delete" //mock 管理员term删除API
export const MGR_DRAFTS = "/business/contents/manager/draft" //mock 管理员草稿一览检索API
export const MGR_DRAFT_DELETE = "/business/contents/draft" //mock 管理员草稿删除API
export const MGR_CONTENTS = "/business/contents/manager/publish" //mock 管理员内容一览检索API
export const MGR_CONTENT_DELETE = "/business/contents/publish" //mock 管理员内容删除
export const MGR_CONTENT_DETAILS = "/business/contents/manager" //mock 管理员内容详细检索
export const MGR_CONTENT_ADD = "/business/contents" //mock 管理员内容详细检索
export const MGR_CONTENT_EDIT = "/business/contents" //mock 管理员内容详细检索
export const MGR_CONTENT_RELEASE = "/business/contents/publish" //mock 管理员发布
export const MGR_CONTENT_STATUS_UPDATE = "/business/contents/publish" //mock 管理员内容状态更新API
export const MGR_DRAFT_SAVE = "/business/contents/draft" //mock 管理员草稿保存API
export const ADMIN_USERS_INFO = "/admin/users_info" //mock admin用户情报检索API
export const ADMIN_LOGIN_DEV = "/admin/login" //development admin login

//front
export const USER_CONTENT_DETAILS = "/business/contents" //用户内容详细检索
export const USER_LOGIN = "/account/login" //用户登录(爱数callback)
export const USER_LOGOUT = "/account/logout" //用户登录(爱数callback)
export const USER_CONTENTS = "/business/contents" //用户内容一览检索
export const USER_INFO = "/account/me" //用户情报检索
export const USER_TERMS = "/business/contents/terms" //用户内容一览检索
export const FILE_DOWNLOAD = "/file" //用户内容一览检索
export const TOKEN = "/account/token" //用户内容一览检索
export const USER_TOKEN = "/account/me/token" //用户token获取API

export const UPLOAD_PART = "/file/upload_part" //分片上传

//loadingApi
export const LOADING_API = [MGR_CONTENTS, MGR_CONTENT_DELETE, MGR_CONTENT_DETAILS, MGR_DRAFTS, MGR_DRAFT_DELETE, USER_CONTENT_DETAILS, USER_CONTENTS, TERM_LIST, ADMIN_USERS_INFO]
