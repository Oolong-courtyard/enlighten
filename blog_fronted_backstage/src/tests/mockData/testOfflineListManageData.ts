let longData = []
for (let i = 0; i < 200; i++) {
    let itemData = {
        cancel_date: "2020-07-01 14:02:20",
        cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
        product_type: "产品类型测试" + i,
        content_id: "" + i,
        content_name: "软件名称测试" + i,
        publisher: "开发者" + i,
        description: "产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介",
        content_type: "内容类型测试" + i,
        version: "1.0.0",
        thumbnail_url: "测试-下载地址",
    }
    longData.push(itemData)
}
export const GET_APPLIST_SEARCH_DATA_NO_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_CONTENTS_LEN0 = {
    code: 100,
    message: "success",
    detail: {
        contents: [],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_CONTENTS_LEN1 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                cancel_date: "2020-07-01 14:02:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                product_type: "产品类型测试1",
                content_id: "1",
                content_name: "软件名称测试1",
                publisher: "开发者1",
                description: "产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介",
                content_type: "内容类型测试1",
                version: "1.0.0",
                thumbnail_url: "测试-下载地址",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_CONTENTS_LEN2 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                cancel_date: "2020-07-01 14:02:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                product_type: "产品类型测试1",
                content_id: "1",
                content_name: "软件名称测试1",
                publisher: "开发者1",
                description: "产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介",
                content_type: "内容类型测试1",
                version: "1.0.0",
                thumbnail_url: "测试-下载地址",
            },
            {
                cancel_date: "2020-07-02 14:02:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                product_type: "产品类型测试2",
                content_id: "2",
                content_name: "软件名称测试2",
                publisher: "开发者2",
                description: "产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介",
                content_type: "内容类型测试1",
                version: "1.0.0",
                thumbnail_url: "测试-下载地址",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 100,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        contents: longData,
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 100,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_HAS_CONTENTS_CANCEL_DATE_NULL = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                cancel_date: null,
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                product_type: "产品类型测试1",
                content_id: "1",
                content_name: "软件名称测试1",
                publisher: "开发者1",
                description: "产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介产品简介",
                content_type: "内容类型测试1",
                version: "1.0.0",
                thumbnail_url: "测试-下载地址",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock应用列表数据获取成功----创建时间为null",
    },
}
export const GET_APPLICATION_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        content_id: "9dd8d0bca12941259c2d3f62c0dde098",
        record_id: "c1b745fa3e4a41c694084b473ba70274",
    },
}
export const GET_APPLICATION_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {},
}
export const GET_APPLICATION_DELETE_DATA_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "mock应用列表list删除回调",
    },
}
export const GET_APPLICATION_DELETE_DATA_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "mock应用列表list删除回调",
    },
}
// 商家应用
export const GET_APPLICATION_UPDATE_DATA_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "mock应用列表list上架应用回调",
    },
}
// 编辑应用时，
export const GET_APPLICATION_EDIT_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        content_id: "9dd8d0bca12941259c2d3f62c0dde098",
        record_id: "c1b745fa3e4a41c694084b473ba70274",
    },
}
export const GET_APPLICATION_EDIT_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {},
}
