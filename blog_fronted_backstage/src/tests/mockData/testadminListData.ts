let longData = []
for (let i = 0; i < 200; i++) {
    let itemData = {
        user_id: "aaa" + i,
        user_id_short: "1" + i,
        client_id: "1" + i,
        email: "fsfs" + i,
        nickname: "sds" + i,
        phone: "123444444" + i,
        third_auth_id: null,
        unregister_time: null,
        user_type: "manager",
    }
    longData.push(itemData)
}
export const GET_ADMIN_SEARCH_DATA_NO_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_ADMIN_SEARCH_DATA_CONTENTS_LEN0 = {
    code: 100,
    message: "success",
    detail: {
        users: [],
        dec: "标签列表页 api-list获取成功",
    },
}
export const GET_ADMIN_SEARCH_DATA_CONTENTS_LEN1 = {
    code: 100,
    message: "success",
    detail: {
        users: [
            {
                user_id: "aaa",
                user_id_short: "1",
                client_id: "1",
                email: "fsfs",
                nickname: "sds",
                phone: "123444444",
                third_auth_id: null,
                unregister_time: null,
                user_type: "manager",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 1,
        desc: "mock user list获取成功",
    },
}
export const GET_ADMIN_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        users: longData,
        page: 1,
        has_next: true,
        total_pages: 20,
        count: 200,
        desc: "mock user list获取成功",
    },
}
export const GET_ADMIN_SEARCH_DATA_CONTENTS_LEN2 = {
    code: 100,
    message: "success",
    detail: {
        users: [
            {
                user_id: "aaa1",
                user_id_short: "1",
                client_id: "1",
                email: "fsfs",
                nickname: "sds",
                phone: "123444444",
                third_auth_id: null,
                unregister_time: null,
                user_type: "user",
            },
            {
                user_id: "aaa2",
                user_id_short: "1",
                client_id: "1",
                email: "fsfs",
                nickname: "sds",
                phone: "123444444",
                third_auth_id: null,
                unregister_time: null,
                user_type: "manager",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 2,
        desc: "mock user list获取成功",
    },
}
// 修改权限，
export const GET_ADMIN_EDIT_CONTENT_ID_SUCCESS = {
    code: 100,
    message: "success",
    detail: {
        desc: "修改权限成功",
    },
}
export const GET_ADMIN_EDIT_CONTENT_ID_FAILED = {
    code: 100,
    message: "failed",
    detail: {
        desc: "修改权限失败",
    },
}
