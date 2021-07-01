let longData = []
for (let i = 0; i < 200; i++) {
    let itemData = {
        term_id: "" + i,
        slug: "slug" + i,
        text: "text" + i,
        description: "description" + i,
    }
    longData.push(itemData)
}
export const GET_CLASS_SEARCH_DATA_NO_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        type: "2",
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_CLASS_SEARCH_DATA_CONTENTS_LEN0 = {
    code: 100,
    message: "success",
    detail: {
        type: "2",
        term_type: "tag",
        terms: [],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 9,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_CLASS_SEARCH_DATA_CONTENTS_LEN1 = {
    code: 100,
    message: "success",
    detail: {
        type: "2",
        term_type: "tag",
        terms: [
            {
                term_id: "1",
                slug: "slug1",
                text: "text1",
                description: "description1",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 1,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_CLASS_SEARCH_DATA_CONTENTS_LEN2 = {
    code: 100,
    message: "success",
    detail: {
        type: "2",
        term_type: "tag",
        terms: [
            {
                term_id: "1",
                slug: "slug1",
                text: "text1",
                description: "description1",
            },
            {
                term_id: "1",
                slug: "slug2",
                text: "text2",
                description: "description2",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 2,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_CLASS_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        type: "2",
        term_type: "tag",
        terms: longData,
        page: 1,
        has_next: true,
        total_pages: 20,
        count: 200,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_CLASS_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        content_id: "9dd8d0bca12941259c2d3f62c0dde098",
        record_id: "c1b745fa3e4a41c694084b473ba70274",
    },
}
export const GET_CLASS_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {},
}
export const GET_CLASS_DATA_DELETE_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "mock应用列表list删除回调",
    },
}
export const GET_CLASS_DELETE_DATA_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "mock应用列表list删除回调",
    },
}
// 编辑应用时，
export const GET_CLASS_EDIT_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        content_id: "9dd8d0bca12941259c2d3f62c0dde098",
        record_id: "c1b745fa3e4a41c694084b473ba70274",
    },
}
export const GET_CLASS_EDIT_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {},
}
// 新增组别成功
export const POST_CLASS_GROUP_SUCCESS = {
    code: 100,
    message: "success",
    detail: { desc: "新增组别成功回调" },
}
// 新增组别未成功
export const POST_CLASS_GROUP_FAILED = {
    code: 100,
    message: "failed",
    detail: { desc: "新增组别失败回调" },
}
