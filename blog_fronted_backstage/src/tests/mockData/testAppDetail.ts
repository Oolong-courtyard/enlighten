export const GET_APP_DETAIL_CONTENTS = {
    code: 100,
    message: "success",
    detail: {
        contents: {
            content_id: "",
            content_name: "test测试",
            content_type: 1,
            created_date: "",
            description: "这是单元测试mock",
            logo_url: "",
            preview_media_urls: {
                image: "",
            },
            product_info: "这是单元测试mock",
            product_type: 1,
            publisher: "test",
            record_id: "",
            support_info: {
                phone: "18205649876",
                email: "2678245634@qq.com",
            },
            version: "1.0.0",
            tag_id_list: [],
            count: 0,
        },
    },
}
export const GET_PUBLISHER_OTHER_APPLICATION_LEN1 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                created_date: "2020-06-28 17:04:15",
                content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
                record_id: "bd219f70879f4acdb866bdabdebf706c",
                reversion: "536b4d0826fd47909edba8ea654a3e26",
                record_type: "publish",
                product_type: null,
                content_name: "adadadadasd",
                publisher: null,
                description: null,
                content_type: null,
                version: null,
                thumbnail_url: null,
                sort_key: 0,
                delete_flg: 0,
            },
        ],
    },
}
export const GET_PUBLISHER_OTHER_APPLICATION_LEN2 = {
    code: 100,
    message: "success",
    detail: {
        contents: [
            {
                created_date: "2020-06-28 17:04:15",
                content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
                record_id: "bd219f70879f4acdb866bdabdebf706c",
                reversion: "536b4d0826fd47909edba8ea654a3e26",
                record_type: "publish",
                product_type: null,
                content_name: "adadadadasd",
                publisher: null,
                description: null,
                content_type: null,
                version: null,
                thumbnail_url: null,
                sort_key: 0,
                delete_flg: 0,
            },
            {
                created_date: "2020-07-02 11:04:15",
                content_id: "c0ab3f50f85943d18a2f8468daad1ab0",
                record_id: "bd219f70879f4acdb866bdabdebf706c",
                reversion: "536b4d0826fd47909edba8ea654a3e26",
                record_type: "publish",
                product_type: null,
                content_name: "adadadadasd",
                publisher: null,
                description: null,
                content_type: null,
                version: null,
                thumbnail_url: null,
                sort_key: 0,
                delete_flg: 0,
            },
        ],
    },
}
export const GET_APP_DETAIL_TERMS_GROUP = {
    code: 100,
    message: "success",
    detail: {
        relations: {
            terms: [{ text: "标签1" }, { text: "标签2" }],
        },
    },
}

export const GET_APP_DETAIL_DOWNLOAD = { code: 100, message: "success", detail: { download_url_list: ["https://obs.cn-east-2.myhuaweicloud.com/developers-test/files/b960f9c7-6da1-4892-b4ba-780f799955e1_2020-08-05%3A11%3A04%3A47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=5AETREHFP77F5LD2B3W0%2F20200810%2Fcn-east-2%2Fs3%2Faws4_request&X-Amz-Date=20200810T045702Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0871cf3fdd987e348dbce5e258c911cd354cc181d0f05d1d87e774f4726e2a0c"] } }
