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
export const GET_TAG_SEARCH_DATA_NO_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 0,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_TAG_SEARCH_DATA_CONTENTS_LEN0 = {
    code: 100,
    message: "success",
    detail: {
        terms: [],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 0,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_TAG_SEARCH_DATA_CONTENTS_LEN1 = {
    code: 100,
    message: "success",
    detail: {
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
        dec: "标签列表页ist删除回调后，获取list成功",
    },
}
export const GET_TAG_SEARCH_DATA_CONTENTS_LEN2 = {
    code: 100,
    message: "success",
    detail: {
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
export const GET_TAG_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        terms: longData,
        page: 1,
        has_next: true,
        total_pages: 20,
        count: 200,
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_TAG_SEARCH_DATA_CONTENTS_LEN3 = {
    code: 100,
    message: "success",
    detail: {
        terms: [
            {
                term_id: "1",
                slug: "slug1",
                text: "text1",
                description: "description1",
            },
            {
                term_id: "2",
                slug: "slug2",
                text: "text2",
                description: "description2",
            },
            {
                term_id: "3",
                slug: "slug3",
                text: "text3",
                description: "description3",
            },
        ],
        page: 1,
        has_next: true,
        total_pages: 1,
        count: 3,
        dec: "标签列表页 api-list获取成功",
    },
}
// 删除应用时
export const GET_TAG_DELETE_DATA_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "mock标签list删除回调",
    },
}
export const GET_TAG_DELETE_DATA_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "mock标签list删除回调",
    },
}
// 编辑应用时，
export const GET_TAG_EDIT_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "编辑应用时回调",
    },
}
export const GET_TAG_EDIT_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "编辑应用时回调",
    },
}
// 新增组别成功
export const POST_TAG_GROUP_SUCCESS = {
    code: 100,
    status: "success",
    detail: {
        desc: "新增成功回调",
    },
}
// 新增组别未成功
export const POST_TAG_GROUP_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "新增失败回调",
    },
}
