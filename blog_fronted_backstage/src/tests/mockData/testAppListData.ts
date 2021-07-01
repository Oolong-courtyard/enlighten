let longData = []
for (let i = 0; i < 200; i++) {
    let itemData = {
        cancel_date: "2020-07-01 14:02:20",
        cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
        content_id: "coldcoldman",
        content_name: "tes",
        content_type: "application",
        indexId: i + 1,
        product_type: "any_robot_cloud",
        publisher: "red",
        record_id: i + 1,
        release_date: "2020-06-10 17:08:45",
        release_manager: "四川李德胜",
        status: "cancel",
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
                cancel_date: "2020-07-13 12:35:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                content_id: "coldcoldman",
                content_name: "tes",
                content_type: "application",
                indexId: 2,
                product_type: "any_robot_cloud",
                publisher: "red",
                record_id: "4ac75a52-85c6-478e-9461-6e0438317b0e-2020-06-09:16:15:09",
                release_date: "2020-06-10 17:08:45",
                release_manager: "test 管理员",
                status: "cancel",
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
                content_id: "coldcoldman",
                content_name: "tes",
                content_type: "application",
                indexId: 1,
                product_type: "any_robot_cloud",
                publisher: "red",
                record_id: "4ac75a52-85c6-478e-9461-6e0438317b0e-2020-06-09:16:15:09",
                release_date: "2020-06-10 17:08:45",
                release_manager: "四川李德胜",
                status: "cancel",
            },
            {
                cancel_date: "2020-07-13 12:35:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                content_id: "coldcoldman",
                content_name: "tes",
                content_type: "application",
                indexId: 2,
                product_type: "any_robot_cloud",
                publisher: "red",
                record_id: "4ac75a52-85c6-478e-9461-6e0438317b0e-2020-06-09:16:15:09",
                release_date: "2020-06-10 17:08:45",
                release_manager: "test 管理员",
                status: "cancel",
            },
        ],
        page: 3,
        has_next: true,
        total_pages: 1,
        count: 2,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_CONTENTS_LEN200 = {
    code: 100,
    message: "success",
    detail: {
        contents: longData,
        page: 1,
        has_next: true,
        total_pages: 20,
        count: 200,
        desc: "mock应用列表数据获取成功",
    },
}
export const GET_APPLIST_SEARCH_DATA_HAS_CONTENTS_RELEASE_DATE_NULL = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                cancel_date: "2020-07-01 14:02:20",
                cancel_manager: "AZivbi9Z3MXbjnQi5xvR6Q",
                content_id: "coldcoldman",
                content_name: "tes",
                content_type: "application",
                indexId: 1,
                product_type: "any_robot_cloud",
                publisher: "red",
                record_id: "4ac75a52-85c6-478e-9461-6e0438317b0e-2020-06-09:16:15:09",
                release_date: null,
                release_manager: "四川李德胜",
                status: "cancel",
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
// 下架回调data
export const GET_APPLICATION_OFFLINE_DATA = {
    code: 100,
    message: "failed",
    detail: {
        desc: "mock应用列表下架应用回调",
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
