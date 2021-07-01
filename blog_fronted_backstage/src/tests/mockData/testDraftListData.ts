let longData = []
for (let i = 0; i < 200; i++) {
    let itemData = {
        product_type: "产品类型测试" + i,
        content_id: "" + i,
        record_id: "1" + i,
        content_name: "软件名称测试" + i,
        content_type: "内容类型测试" + i,
        publisher: "作者测试1",
        created_date: "20200605",
    }
    longData.push(itemData)
}
export const GET_DRAFT_SEARCH_DATA_NO_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock草稿箱list获取成功",
    },
}
export const GET_DRAFT_SEARCH_DATA_CONTENTS_LEN0 = {
    code: 100,
    message: "success",
    detail: {
        contents: [],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 0,
        desc: "mock草稿箱list获取成功",
    },
}
export const GET_DRAFT_SEARCH_DATA_CONTENTS_LEN1 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                product_type: "产品类型测试1",
                content_id: "1",
                record_id: "1",
                content_name: "软件名称测试1",
                content_type: "内容类型测试1",
                publisher: "作者测试1",
                created_date: "20200605",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 1,
        desc: "mmock草稿箱list删除回调后，获取list成功",
    },
}
export const GET_DRAFT_SEARCH_DATA_CONTENTS_LEN2 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                product_type: "产品类型测试1",
                content_id: "1",
                record_id: "1",
                content_name: "软件名称测试1",
                content_type: "内容类型测试1",
                publisher: "作者测试1",
                created_date: "20200605",
            },
            {
                product_type: "产品类型测试2",
                content_id: "2",
                record_id: "2",
                content_name: "软件名称测试2",
                content_type: "内容类型测试2",
                publisher: "作者测试2",
                created_date: "20200607",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 2,
        desc: "mmock草稿箱list删除回调后，获取list成功",
    },
}
export const GET_DRAFT_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        contents: longData,
        page: 1,
        has_next: true,
        total_pages: 20,
        count: 200,
        desc: "mmock草稿箱list删除回调后，获取list成功",
    },
}
export const GET_DRAFT_SEARCH_DATA_CONTENTS_LEN3 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                product_type: "产品类型测试1",
                content_id: "1",
                record_id: "1",
                content_name: "软件名称测试1",
                content_type: "内容类型测试1",
                publisher: "作者测试1",
                created_date: "20200605",
            },
            {
                product_type: "产品类型测试2",
                content_id: "2",
                record_id: "2",
                content_name: "软件名称测试2",
                content_type: "内容类型测试2",
                publisher: "作者测试2",
                created_date: "20200607",
            },
            {
                product_type: "产品类型测试3",
                content_id: "3",
                record_id: "3",
                content_name: "软件名称测试3",
                content_type: "内容类型测试3",
                publisher: "作者测试3",
                created_date: "202006010",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 200,
        desc: "mock草稿箱list获取成功",
    },
}
export const GET_draft_search_data_HasContents_created_date_null = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                product_type: "产品类型测试1",
                content_id: "1",
                record_id: "1",
                content_name: "软件名称测试1",
                content_type: "内容类型测试1",
                publisher: "作者测试1",
                created_date: null,
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 1,
        desc: "mock草稿箱list获取成功",
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
    detail: {
        desc: "mock草稿箱list删除回调",
    },
}
export const GET_DFAFT_DELETE_DATA_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "mock草稿箱list删除回调",
    },
}
export const GET_DFAFT_DELETE_DATA_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "mock草稿箱list删除回调",
    },
}
